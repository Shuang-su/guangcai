"""One-time, manifest-pinned cleanup. Default is verify-only; --apply deletes."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import stat
import subprocess

REPO = Path(__file__).resolve().parents[3]
RECORD = "docs/changes/20261015-verified-dedup-cleanup"
ROOT = Path("/Volumes/Prism_初号機/广彩")
DIRECTORIES = {
    "guangcai-v4-workspace/guangcai-china-preview/dist",
    "guangcai-v4-workspace/guangcai-china-preview/.codex-work/deploy/v4-final",
    "历史工程/h5/dist",
    "历史工程/GuangcaiCeramic/guangcai-viewer/dist",
    "历史工程/GuangcaiCeramic/guangcai-viewer/.codex-work/tmp/verified-delivery",
}
SINGLES = {
    "素材原件/一号杯2/ChatGPT 图像 2026年9月29日 21_17_21.jpg",
    "素材原件/微信图片_20260922202625_228_6490.png",
}


def digest(path):
    with path.open("rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def git_blob(ref, path):
    return subprocess.check_output(["git", "show", f"{ref}:{path}"], cwd=REPO)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--checkpoint", required=True)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    ref = subprocess.check_output(
        ["git", "rev-parse", "--verify", args.checkpoint + "^{commit}"], cwd=REPO, text=True
    ).strip()
    manifest = json.loads(git_blob(ref, RECORD + "/cleanup-manifest.json"))
    assert manifest["root"] == str(ROOT) and ROOT.stat().st_dev == manifest["device"]
    assert set(manifest["directories"]) == DIRECTORIES
    assert set(manifest["standaloneFiles"]) == SINGLES
    entries = manifest["files"] + manifest["metadata"]
    expected = {row["path"] for row in entries}
    assert len(expected) == len(entries)
    observed = set()
    for rel in DIRECTORIES:
        base = ROOT / rel
        assert base.resolve() == base and base.is_dir()
        handles = subprocess.run(["lsof", "-nP", "+D", str(base)], capture_output=True)
        assert handles.returncode in (0, 1) and not handles.stdout and not handles.stderr
        for folder, dirs, names in os.walk(base, followlinks=False):
            for name in dirs + names:
                path = Path(folder) / name
                assert not path.is_symlink() and path.stat().st_dev == manifest["device"]
                if path.is_file():
                    observed.add(str(path.relative_to(ROOT)))
    assert observed <= expected, "Unexpected file appeared in a cleanup directory"
    for row in entries:
        rel = Path(row["path"])
        assert not rel.is_absolute() and ".." not in rel.parts
        path = ROOT / rel
        assert path.resolve() == path and stat.S_ISREG(path.lstat().st_mode)
        assert path.stat().st_dev == manifest["device"]
        assert path.stat().st_size == row["bytes"] and digest(path) == row["sha256"]
        inside = any(path.is_relative_to(ROOT / d) for d in DIRECTORIES)
        dir_sidecars = {str((ROOT / d).with_name("._" + Path(d).name).relative_to(ROOT)) for d in DIRECTORIES}
        single_sidecars = {str(Path(d).with_name("._" + Path(d).name)) for d in SINGLES}
        assert inside or str(rel) in SINGLES | dir_sidecars | single_sidecars
    verified = set()
    for row in manifest["files"]:
        assert row["storage"] in {"git-blob", "existing-git-blob"}, "Unexpected archive storage type"
        if row["sha256"] not in verified:
            raw = git_blob(ref, row["archivePath"])
            assert len(raw) == row["bytes"] and hashlib.sha256(raw).hexdigest() == row["sha256"]
            verified.add(row["sha256"])
    backup = manifest["metadataBackup"]
    assert digest(Path(backup["path"])) == backup["sha256"]
    for pair in manifest["retainedMaterials"]:
        assert digest(ROOT / pair["kept"]) == pair["sha256"]
    for row in json.loads(git_blob(ref, RECORD + "/protected-runtime-files.json")):
        assert digest(ROOT / row["path"]) == row["sha256"]
    result = {"checkpoint": ref, "verifiedContentFiles": len(manifest["files"]),
              "verifiedUniqueArchiveContents": len(verified), "verifiedMetadataFiles": len(manifest["metadata"]),
              "protectedRuntimeFiles": 1136, "apply": args.apply, "deleted": [],
              "associatedMetadataAlreadyRemoved": [], "removedDirectories": []}
    free = lambda: os.statvfs(ROOT).f_bavail * os.statvfs(ROOT).f_frsize
    result["freeBytesBefore"] = free()
    if args.apply:
        try:
            for row in entries:
                path = ROOT / row["path"]
                # macOS may remove a verified AppleDouble sidecar with its data file.
                if row in manifest["metadata"] and not path.exists():
                    result["associatedMetadataAlreadyRemoved"].append(row["path"])
                    continue
                # Recheck directly before unlinking; keep all retained copies in place.
                assert digest(path) == row["sha256"]
                path.unlink()
                result["deleted"].append(row["path"])
            for rel in DIRECTORIES:
                base = ROOT / rel
                for folder, dirs, names in os.walk(base, topdown=False):
                    assert not names
                    Path(folder).rmdir()
                result["removedDirectories"].append(rel)
        except Exception as error:
            result["error"] = str(error)
            raise
        finally:
            result["freeBytesAfter"] = free()
            (REPO / RECORD / "deletion-result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({key: value for key, value in result.items() if key != "deleted"}, ensure_ascii=False))
    if args.apply:
        print(json.dumps({"deletedContentFiles": len(manifest["files"]), "deletedMetadataFiles": len(manifest["metadata"]),
                          "netFreeIncrease": result["freeBytesAfter"] - result["freeBytesBefore"]}))


if __name__ == "__main__":
    main()

"""Exterior-connected empty regions, using all image edges as sky."""
import numpy as np


def enclosed_mask(coverage):
    wall = np.pad(coverage > 127, 1)
    seen = np.zeros_like(wall)
    queue = [(0, 0)]
    while queue:
        y, x = queue.pop()
        if wall[y,x] or seen[y,x]:
            continue
        blocked = wall[y] | seen[y]
        previous = np.flatnonzero(blocked[:x])
        following = np.flatnonzero(blocked[x:])
        left = int(previous[-1]+1) if len(previous) else 0
        right = int(x+following[0]) if len(following) else wall.shape[1]
        seen[y,left:right] = True
        for ny in [y-1,y+1]:
            if 0 <= ny < wall.shape[0]:
                available = ~(wall[ny,left:right] | seen[ny,left:right])
                starts = np.flatnonzero(available & np.r_[True, ~available[:-1]])
                queue.extend((ny, int(left+start)) for start in starts)
    return ~wall[1:-1,1:-1] & ~seen[1:-1,1:-1]

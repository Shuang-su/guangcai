//  XYSlider.swift
//  (c) Andrew Janson 2025

import SwiftUI

struct XYSlider: View {
    
    @Environment(\.colorScheme) private var colorScheme
    
    @Binding public var value: CGPoint
    public var origin: OriginPoint?
    public var gridDensity: GridDensity?
    public var dotColor: Color?
    
    public init(_ value: Binding<CGPoint>, origin: OriginPoint? = .center, gridDensity: GridDensity? = .medium, dotColor: Color? = .yellow) {
        self._value = value
        self.origin = origin
        self.gridDensity = gridDensity
        self.dotColor = dotColor
    }
    
    @State private var location = CGPoint(x: 0, y: 0)
    @State private var viewSize: CGSize = .zero
    private var padding: CGFloat = 22.0
    private var gridSize: (rows: Int, columns: Int) {
        
        var densityFactor: Int {
            switch gridDensity {
            case .low: return 30
            case .high: return 15
            default: return 22
            }
        }
        
        let paddedWidth = viewSize.width + (padding * 2)
        let paddedHeight = viewSize.height + (padding * 2)
        
        let rows = Int(paddedWidth / CGFloat(densityFactor))
        let columns = Int(paddedHeight / CGFloat(densityFactor))
        
        return (rows: rows % 2 == 0 ? rows : rows + 1,
                columns: columns % 2 == 0 ? columns : columns + 1)
    }

    public var body: some View {
        
        ZStack {
            GeometryReader { geo in
                ZStack {
                    ForEach(0...gridSize.rows, id: \.self) { r in
                        ForEach(0...gridSize.columns, id:\.self) { c in
                            let pos = CGPoint(
                                x: Double(r) / Double(gridSize.rows) * geo.size.width,
                                y: Double(c) / Double(gridSize.columns) * geo.size.height)
                            
                            let distance = hypot(pos.x - location.x, pos.y - location.y)
                            
                            let scale = max(1, 2 - distance / 50)
                            let opacity = max(0.2, 1 - (distance / 100))
                            
                            Circle()
                                .fill(colorScheme == .dark ? .white : .black)
                                .opacity(dotOpacity(row: r, column: c, v: opacity))
                                .frame(width: 4 * scale)
                                .position(pos)
                                .shadow(color: .white.opacity(opacity), radius: opacity * 4)
                        }
                    }
                }
                .onAppear {
                    
                    if viewSize == .zero {
                        viewSize = geo.size
                    }
                    setOrigin()
                }
            }
            
        }.frame(minWidth: 50, maxWidth: .infinity, minHeight: 50, maxHeight: .infinity)
            .coordinateSpace(.named("grid"))
            .padding(padding)
            .glassEffect(.regular.interactive(), in: RoundedRectangle(cornerRadius: 24))
            .overlay {
                pip
            }
    }
    
    private var pip: some View {
        
        ZStack {
            Circle()
                .fill(dotColor ?? .yellow)
                .frame(width: 18)
        }.position(location)
            .gesture(drag)
            .padding(padding)
    }

    private var drag: some Gesture {
        DragGesture(coordinateSpace: .named("grid"))
            .onChanged { drag in
                let x = min(max(drag.location.x, 0), viewSize.width)
                let y = min(max(drag.location.y, 0), viewSize.height)
                location = CGPoint(x: x, y: y)
                //Normalization of CGPoint variables
                let normalizedX = x / viewSize.width
                let normalizedY = y / viewSize.height
                
                switch origin {
                case .leading:
                    value = CGPoint(x: normalizedX, y: -2 * (normalizedY - 0.5))
                case .bottomLeading:
                    value = CGPoint(x: normalizedX, y: (normalizedY - 1) * -1)
                default:
                    value = CGPoint(x: 2 * (normalizedX - 0.5), y: -2 * (normalizedY - 0.5)) //Center w/ Cartesian Coords
                }
            }
    }
    
    private func setOrigin() {
        
        switch origin {
        case .leading:
            location = CGPoint(x: 0, y: viewSize.height / 2)
        case .bottomLeading:
            location = CGPoint(x: 0, y: viewSize.height)
        default:
            location = CGPoint(x: viewSize.width / 2, y: viewSize.height / 2)
        }
    }
    
    private func dotOpacity(row: Int, column: Int, v: CGFloat) -> CGFloat {
        
        switch origin {
        case .leading:
            return row == 0 ? 1 : column == gridSize.columns / 2 ? 1 : v
        case .bottomLeading:
            return row == 0 ? 1 : column == gridSize.columns ? 1 : v
        default:
            return row == gridSize.rows / 2 ? 1 : column == gridSize.columns / 2 ? 1 : v
        }
    }
}

// MARK: - Enums
public enum GridDensity {
    case low, medium, high
}

public enum OriginPoint {
    case center, leading, bottomLeading
}

/**
 * Floyd-Warshall Algorithm - All-Pairs Shortest Path
 * https://neetcode.io/ (Advanced Graphs)
 *
 * Time: O(V³) | Space: O(V²)
 *
 * Problem Statement:
 * Given a weighted directed graph with V vertices, find the shortest path
 * between every pair of vertices. The graph may contain negative edge weights
 * but NO negative cycles.
 *
 * Input: adjacency matrix where graph[i][j] = weight, or INF if no edge
 * Output: matrix of shortest distances between all pairs
 *
 * Test Cases:
 * Example 1:
 *   Input:  [[0, 3, INF, 7],
 *            [8, 0, 2, INF],
 *            [5, INF, 0, 1],
 *            [2, INF, INF, 0]]
 *   Output: [[0, 3, 5, 6],
 *            [5, 0, 2, 3],
 *            [3, 6, 0, 1],
 *            [2, 5, 7, 0]]
 *
 * Example 2 (with negative edge):
 *   Input:  [[0, 1, INF],
 *            [INF, 0, -1],
 *            [INF, INF, 0]]
 *   Output: [[0, 1, 0],
 *            [INF, 0, -1],
 *            [INF, INF, 0]]
 */

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;
const int MAXN = 105;

// Global array for CP-style standalone function
int d[MAXN][MAXN];

// ============================================================
// Competitive Programming Style Implementation
// ============================================================
//
// Why this style?
// - Static arrays are faster (cache-friendly, no allocation)
// - 1-indexed matches most CP problem input formats
// - Handles multiple edges with min() on input
// - Can treat as undirected by setting both d[u][v] and d[v][u]
//
// CRITICAL: Always check for INF before adding to avoid overflow!
//   If d[i][k] = INF and d[k][j] is negative:
//   INF + negative = some large positive number (not INF!)
//   This produces a fake "valid" path when none exists.
//
// ============================================================

class Solution {
public:
    vector<vector<int>> floydWarshall(vector<vector<int>>& graph) {
        int n = graph.size();
        
        // Use static-style local array (CP pattern)
        // +1 for 1-indexing convenience
        int d[MAXN][MAXN];
        
        // Step 1: Initialize
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                // graph is 0-indexed, d is 1-indexed
                d[i][j] = graph[i-1][j-1];
            }
        }
        
        // Step 2: Floyd-Warshall with INF guard
        for (int k = 1; k <= n; k++) {
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= n; j++) {
                    // INF CHECK: skip if either segment doesn't exist
                    if (d[i][k] == INF || d[k][j] == INF) continue;
                    
                    d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
                }
            }
        }
        
        // Step 3: Copy back to vector
        vector<vector<int>> result(n, vector<int>(n));
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                result[i-1][j-1] = d[i][j];
            }
        }
        
        return result;
    }
};

// ============================================================
// Standalone CP-Style Function (for direct use in contests)
// ============================================================
//
// Usage in CP:
//   int n, m; cin >> n >> m;
//   cpFloydWarshall(n, m);
//
// Assumes global: int d[MAXN][MAXN];
//
// ============================================================

void cpFloydWarshall(int n, int m) {
    // Initialize
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            d[i][j] = INF;
        }
    }
    for (int i = 1; i <= n; i++) {
        d[i][i] = 0;
    }
    
    // Read edges
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        
        // For directed graph:
        d[u][v] = min(d[u][v], w);
        
        // For undirected graph (uncomment if needed):
        // d[v][u] = min(d[v][u], w);
    }
    
    // Run algorithm
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (d[i][k] == INF || d[k][j] == INF) continue;
                d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
            }
        }
    }
    
    // Output
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
            cout << (d[i][j] == INF ? -1 : d[i][j]) << " \n"[j == n];
        }
    }
}

// ============================================================
// Mini Test Harness (self-contained)
// ============================================================

void printMatrix(const vector<vector<int>>& mat, const string& label) {
    cout << label << ":" << endl;
    for (const auto& row : mat) {
        for (int val : row) {
            if (val >= INF/2) {
                cout << "INF ";
            } else {
                cout << val << " ";
            }
        }
        cout << endl;
    }
    cout << endl;
}

bool matricesEqual(const vector<vector<int>>& a, const vector<vector<int>>& b) {
    if (a.size() != b.size()) return false;
    for (size_t i = 0; i < a.size(); i++) {
        if (a[i].size() != b[i].size()) return false;
        for (size_t j = 0; j < a[i].size(); j++) {
            if (a[i][j] != b[i][j]) return false;
        }
    }
    return true;
}

int main() {
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    
    Solution sol;
    int passed = 0;
    int total = 0;

    // Test 1: Basic 4-node graph
    {
        vector<vector<int>> graph = {
            {0, 3, INF, 7},
            {8, 0, 2, INF},
            {5, INF, 0, 1},
            {2, INF, INF, 0}
        };
        vector<vector<int>> expected = {
            {0, 3, 5, 6},
            {5, 0, 2, 3},
            {3, 6, 0, 1},
            {2, 5, 7, 0}
        };
        
        auto result = sol.floydWarshall(graph);
        
        cout << "Test 1: Basic 4-node graph" << endl;
        printMatrix(result, "Result");
        printMatrix(expected, "Expected");
        
        total++;
        if (matricesEqual(result, expected)) {
            cout << "✅ PASS" << endl;
            passed++;
        } else {
            cout << "❌ FAIL" << endl;
        }
        cout << endl;
    }

    // Test 2: 3-node graph with negative edge
    {
        vector<vector<int>> graph = {
            {0, 1, INF},
            {INF, 0, -1},
            {INF, INF, 0}
        };
        vector<vector<int>> expected = {
            {0, 1, 0},
            {INF, 0, -1},
            {INF, INF, 0}
        };
        
        auto result = sol.floydWarshall(graph);
        
        cout << "Test 2: Graph with negative edge" << endl;
        printMatrix(result, "Result");
        printMatrix(expected, "Expected");
        
        total++;
        if (matricesEqual(result, expected)) {
            cout << "✅ PASS" << endl;
            passed++;
        } else {
            cout << "❌ FAIL" << endl;
        }
        cout << endl;
    }

    // Test 3: Triangle graph
    {
        vector<vector<int>> graph = {
            {0, 4, 11},
            {6, 0, 2},
            {3, INF, 0}
        };
        vector<vector<int>> expected = {
            {0, 4, 6},
            {5, 0, 2},
            {3, 7, 0}
        };
        
        auto result = sol.floydWarshall(graph);
        
        cout << "Test 3: Triangle graph" << endl;
        printMatrix(result, "Result");
        printMatrix(expected, "Expected");
        
        total++;
        if (matricesEqual(result, expected)) {
            cout << "✅ PASS" << endl;
            passed++;
        } else {
            cout << "❌ FAIL" << endl;
        }
        cout << endl;
    }

    // Test 4: Single node
    {
        vector<vector<int>> graph = {{0}};
        vector<vector<int>> expected = {{0}};
        
        auto result = sol.floydWarshall(graph);
        
        cout << "Test 4: Single node" << endl;
        total++;
        if (matricesEqual(result, expected)) {
            cout << "✅ PASS" << endl;
            passed++;
        } else {
            cout << "❌ FAIL" << endl;
        }
        cout << endl;
    }

    // Test 5: Disconnected graph
    {
        vector<vector<int>> graph = {
            {0, INF},
            {INF, 0}
        };
        vector<vector<int>> expected = {
            {0, INF},
            {INF, 0}
        };
        
        auto result = sol.floydWarshall(graph);
        
        cout << "Test 5: Disconnected graph" << endl;
        printMatrix(result, "Result");
        printMatrix(expected, "Expected");
        
        total++;
        if (matricesEqual(result, expected)) {
            cout << "✅ PASS" << endl;
            passed++;
        } else {
            cout << "❌ FAIL" << endl;
        }
        cout << endl;
    }

    cout << "=========================" << endl;
    cout << "Passed: " << passed << "/" << total << endl;
    
    return (passed == total) ? 0 : 1;
}

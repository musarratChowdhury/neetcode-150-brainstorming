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
#include <cassert>

using namespace std;

const int INF = 1e9;

// ============================================================
// TODO: Implement the Floyd-Warshall algorithm
// ============================================================
//
// Hints (Socratic method - think before looking):
//
// 1. What is the state we're maintaining? A matrix of distances.
//    What does dist[i][j] represent?
//
// 2. The key insight: "Can vertex k improve the path from i to j?"
//    How do we express this mathematically?
//
// 3. Why do we need THREE nested loops? What does each loop represent?
//    - Outer loop (k): ???
//    - Middle loop (i): ???
//    - Inner loop (j): ???
//
// 4. What is the update rule? (think about the DP recurrence)
//    dist[i][j] = ___________________________
//
// 5. What do we need to handle if there is no path?
//    (check if dist[i][k] or dist[k][j] is INF before adding)
//
// 6. How do we detect a negative cycle?
//    (check if any dist[i][i] < 0 after the algorithm)
//
// ============================================================

class Solution {
public:
    vector<vector<int>> floydWarshall(vector<vector<int>>& graph) {
        int V = graph.size();
        // TODO: Implement the algorithm
        //
        // Steps:
        // 1. Create a distance matrix initialized with graph values
        // 2. For each intermediate vertex k:
        //    For each source vertex i:
        //      For each destination vertex j:
        //        If dist[i][k] + dist[k][j] < dist[i][j]:
        //          Update dist[i][j]
        // 3. Check for negative cycles
        // 4. Return the distance matrix
        
        // Placeholder - replace with your implementation
        return graph;
    }
};

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

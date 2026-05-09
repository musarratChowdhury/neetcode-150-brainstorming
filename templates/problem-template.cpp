/**
 * NeetCode 150 - C++ Problem Template
 * Compile: g++ -std=c++17 -o solution solution.cpp
 * Run: ./solution
 */

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // TODO: Implement your solution here
    
};

// ==================== TEST HARNESS ====================

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    Solution sol;
    bool allPassed = true;
    int testNum = 0;

    auto runTest = [&](const string& testName, auto&& actual, auto&& expected) {
        testNum++;
        bool pass = (actual == expected);
        if (!pass) allPassed = false;
        cout << "Test " << testNum << " (" << testName << "): " 
             << (pass ? "PASS" : "FAIL") << endl;
        if (!pass) {
            cout << "  Expected: " << expected << endl;
            cout << "  Actual:   " << actual << endl;
        }
    };

    // Example usage (replace with actual problem tests):
    // runTest("Example 1", sol.yourMethod({1,2,3}), 6);
    // runTest("Example 2", sol.yourMethod({}), 0);

    cout << (allPassed ? "\nAll tests passed!" : "\nSome tests failed.") << endl;
    return allPassed ? 0 : 1;
}

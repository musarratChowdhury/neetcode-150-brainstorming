/**
 * NeetCode 150 - Two Sum (Arrays & Hashing #3)
 * Compile: g++ -std=c++17 -o /tmp/two-sum solutions/two-sum.cpp && /tmp/two-sum
 *
 * Problem: Given an array of integers nums and an integer target,
 * return indices of the two numbers such that they add up to target.
 * Each input has exactly one solution, and you may not use the same element twice.
 */

#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // TODO: Implement your solution here
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> m;

        for(int i = 0; i<nums.size(); i++){
            if(m.count(target - nums[i])){
                return {m[target-nums[i]], i};
            }else{
                m[nums[i]] = i;
            }
        }
    }
};

// ==================== TEST HARNESS ====================

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    Solution sol;
    bool allPassed = true;
    int testNum = 0;

    auto runTest = [&](const string& testName, vector<int> input, int target, vector<int> expected) {
        testNum++;
        vector<int> actual = sol.twoSum(input, target);
        bool pass = (actual == expected);
        if (!pass) allPassed = false;
        cout << "Test " << testNum << " (" << testName << "): "
             << (pass ? "PASS" : "FAIL") << endl;
        if (!pass) {
            cout << "  Input:    ";
            for (int x : input) cout << x << " ";
            cout << " target=" << target << endl;
            cout << "  Expected: ";
            for (int x : expected) cout << x << " ";
            cout << endl;
            cout << "  Actual:   ";
            for (int x : actual) cout << x << " ";
            cout << endl;
        }
    };

    runTest("Example 1", {2, 7, 11, 15}, 9,  {0, 1});
    runTest("Example 2", {3, 2, 4},      6,  {1, 2});
    runTest("Example 3", {3, 3},         6,  {0, 1});
    runTest("Negatives", {-1, -2, 3, 4}, 1,  {1, 2});
    runTest("Two elems", {5, 5},         10, {0, 1});

    cout << (allPassed ? "\nAll tests passed!" : "\nSome tests failed.") << endl;
    return allPassed ? 0 : 1;
}

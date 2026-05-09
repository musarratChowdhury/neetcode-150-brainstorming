/**
 * NeetCode 150 - C# Problem Template
 * Run: dotnet run problem.cs
 * Or: csc problem.cs && mono problem.exe
 */

using System;
using System.Collections.Generic;

public class Solution {
    public bool IsAnagram(string s, string t) {
        // TODO: Implement your solution here
        return false;
    }
}

// ==================== TEST HARNESS ====================

public class Program {
    private static int testNum = 0;
    private static bool allPassed = true;

    private static void RunTest(string testName, string s, string t, bool expected) {
        testNum++;
        Solution sol = new Solution();
        bool actual = sol.IsAnagram(s, t);
        bool pass = (actual == expected);
        if (!pass) allPassed = false;

        Console.WriteLine($"Test {testNum} ({testName}): {(pass ? "PASS" : "FAIL")}");
        if (!pass) {
            Console.WriteLine($"  s: \"{s}\", t: \"{t}\"");
            Console.WriteLine($"  Expected: {expected}");
            Console.WriteLine($"  Actual:   {actual}");
        }
    }

    public static void Main(string[] args) {
        // Example usage (replace with actual problem tests):
        // RunTest("Example 1", "anagram", "nagaram", true);

        Console.WriteLine(allPassed ? "\nAll tests passed!" : "\nSome tests failed.");
        Environment.Exit(allPassed ? 0 : 1);
    }
}

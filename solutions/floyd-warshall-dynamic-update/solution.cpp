/*
 * Berland Cities, Floyd Warshall Update Template
 * Source: VJudge Contest 811319, Problem D
 *
 * Usage:
 *   Compile: g++ -std=c++17 -O2 -o solution solution.cpp
 *   Run:     ./solution
 */

#include <bits/stdc++.h>
using namespace std;

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  int n;
  cin >> n;
  vector<vector<int>> dist(n, vector<int>(n));
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < n; ++j)
      cin >> dist[i][j];

  int k;
  cin >> k;
  vector<tuple<int, int, int>> new_roads(k);
  for (int idx = 0; idx < k; ++idx) {
    int a, b, c;
    cin >> a >> b >> c;
    a--;
    b--; // To 0-based indices
    new_roads[idx] = {a, b, c};
  }

  for (int idx = 0; idx < k; ++idx) {
    int a, b, c;
    tie(a, b, c) = new_roads[idx];

    if (dist[a][b] > c) {
      dist[a][b] = dist[b][a] = c;

      for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
          dist[i][j] = min(dist[i][j], dist[i][a] + c + dist[b][j]);
          dist[i][j] = min(dist[i][j], dist[i][b] + c + dist[a][j]);
        }
      }
    }

    long long sum = 0;
    for (int i = 0; i < n; ++i)
      for (int j = i + 1; j < n; ++j)
        sum += dist[i][j];

    cout << sum << " \n"[idx == k - 1];
  }

  return 0;
}

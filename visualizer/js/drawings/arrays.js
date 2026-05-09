/**
 * Arrays & Hashing Visualizations
 */

function createContainsDuplicateScene() {
    const nums = [1, 2, 3, 1];
    const steps = [];
    
    // Step 0: Introduction
    steps.push({
        explanation: "Problem: Given array [1, 2, 3, 1], check if any value appears at least twice.\\n\\nApproach: Use a hash set to track seen elements. O(1) lookup time.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        render: (engine) => {
            engine.drawText("Contains Duplicate", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 100, {}, 50, 10);
            engine.drawText("Input Array", 50, 170, '#888', 14);
        }
    });
    
    // Step 1: Check first element (1)
    steps.push({
        explanation: "Step 1: Check element at index 0: value = 1.\\nIs 1 in the set? No.\\nAdd 1 to the set.",
        render: (engine) => {
            engine.drawText("Contains Duplicate", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 100, {0: 'current'}, 50, 10);
            engine.drawText("Checking index 0", 50, 170, '#4cc9f0', 14);
            
            // Draw empty set
            engine.drawText("Hash Set:", 400, 100, '#eee', 16);
            engine.drawArrayElement(1, 0, 400, 130, 50, 'write');
            engine.drawText("Added 1", 400, 195, '#f72585', 14);
        }
    });
    
    // Step 2: Check second element (2)
    steps.push({
        explanation: "Step 2: Check element at index 1: value = 2.\\nIs 2 in the set? No.\\nAdd 2 to the set.",
        render: (engine) => {
            engine.drawText("Contains Duplicate", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 100, {1: 'current'}, 50, 10);
            engine.drawText("Checking index 1", 50, 170, '#4cc9f0', 14);
            
            engine.drawText("Hash Set:", 400, 100, '#eee', 16);
            engine.drawArrayElement(1, 0, 400, 130, 50, null);
            engine.drawArrayElement(2, 1, 460, 130, 50, 'write');
            engine.drawText("Added 2", 460, 195, '#f72585', 14);
        }
    });
    
    // Step 3: Check third element (3)
    steps.push({
        explanation: "Step 3: Check element at index 2: value = 3.\\nIs 3 in the set? No.\\nAdd 3 to the set.",
        render: (engine) => {
            engine.drawText("Contains Duplicate", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 100, {2: 'current'}, 50, 10);
            engine.drawText("Checking index 2", 50, 170, '#4cc9f0', 14);
            
            engine.drawText("Hash Set:", 400, 100, '#eee', 16);
            engine.drawArrayElement(1, 0, 400, 130, 50, null);
            engine.drawArrayElement(2, 1, 460, 130, 50, null);
            engine.drawArrayElement(3, 2, 520, 130, 50, 'write');
            engine.drawText("Added 3", 520, 195, '#f72585', 14);
        }
    });
    
    // Step 4: Check fourth element (1) - FOUND!
    steps.push({
        explanation: "Step 4: Check element at index 3: value = 1.\\nIs 1 in the set? YES! 1 was seen at index 0.\\nDUPLICATE FOUND! Return true.",
        render: (engine) => {
            engine.drawText("Contains Duplicate", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 100, {3: 'found', 0: 'found'}, 50, 10);
            engine.drawText("DUPLICATE FOUND!", 50, 170, '#2ecc71', 18);
            
            engine.drawText("Hash Set:", 400, 100, '#eee', 16);
            engine.drawArrayElement(1, 0, 400, 130, 50, 'found');
            engine.drawArrayElement(2, 1, 460, 130, 50, null);
            engine.drawArrayElement(3, 2, 520, 130, 50, null);
            
            // Draw connection
            engine.drawArrow(430, 155, 75, 125, '#2ecc71', 'Match!');
            engine.drawText("Return: true", 50, 220, '#2ecc71', 20);
        }
    });
    
    return steps;
}

function createValidAnagramScene() {
    const s = "anagram";
    const t = "nagaram";
    const steps = [];
    
    // Step 0: Introduction
    steps.push({
        explanation: "Problem: Check if 'nagaram' is an anagram of 'anagram'.\\n\\nApproach: Count character frequencies using array[26].",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        render: (engine) => {
            engine.drawText("Valid Anagram", 50, 30, '#e94560', 24);
            engine.drawText("s = \"anagram\"", 50, 80, '#4cc9f0', 18);
            engine.drawText("t = \"nagaram\"", 50, 110, '#ffaa00', 18);
            engine.drawText("Both have same letters with same counts", 50, 150, '#888', 14);
        }
    });
    
    // Step 1: Count frequencies for s
    steps.push({
        explanation: "Step 1: Count characters in 'anagram'.\\na:3, n:1, g:1, r:1, m:1",
        render: (engine) => {
            engine.drawText("Valid Anagram - Counting 's'", 50, 30, '#e94560', 24);
            engine.drawText("s = \"anagram\"", 50, 70, '#4cc9f0', 18);
            
            const sChars = s.split('');
            engine.drawArray(sChars, 50, 110, {}, 40, 5);
            
            // Frequency array
            engine.drawText("Frequency Array [26]:", 50, 190, '#eee', 14);
            const freq = { 'a': 3, 'n': 1, 'g': 1, 'r': 1, 'm': 1 };
            let x = 50;
            Object.entries(freq).forEach(([char, count]) => {
                engine.drawArrayElement(`${char}:${count}`, 0, x, 220, 45, 'write');
                x += 50;
            });
        }
    });
    
    // Step 2: Count frequencies for t
    steps.push({
        explanation: "Step 2: Count characters in 'nagaram' and subtract.\\nAll counts become 0 -> Anagram!",
        render: (engine) => {
            engine.drawText("Valid Anagram - Counting 't'", 50, 30, '#e94560', 24);
            engine.drawText("t = \"nagaram\"", 50, 70, '#ffaa00', 18);
            
            const tChars = t.split('');
            engine.drawArray(tChars, 50, 110, {}, 40, 5);
            
            engine.drawText("After subtraction:", 50, 190, '#eee', 14);
            const result = { 'a': 0, 'n': 0, 'g': 0, 'r': 0, 'm': 0 };
            let x = 50;
            Object.entries(result).forEach(([char, count]) => {
                engine.drawArrayElement(`${char}:${count}`, 0, x, 220, 45, 'found');
                x += 50;
            });
            
            engine.drawText("All zeros! Return: true", 50, 280, '#2ecc71', 20);
        }
    });
    
    return steps;
}

function createTwoSumScene() {
    const nums = [2, 7, 11, 15];
    const target = 9;
    const steps = [];
    
    // Step 0: Introduction
    steps.push({
        explanation: "Problem: Find two numbers in [2, 7, 11, 15] that add up to 9.\\n\\nApproach: Hash map stores value -> index. For each element, check if (target - nums[i]) exists.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        render: (engine) => {
            engine.drawText("Two Sum", 50, 30, '#e94560', 24);
            engine.drawText("nums = [2, 7, 11, 15]", 50, 70, '#4cc9f0', 18);
            engine.drawText("target = 9", 50, 100, '#ffaa00', 18);
            engine.drawText("Need to find: nums[i] + nums[j] = 9", 50, 140, '#888', 14);
        }
    });
    
    // Step 1: Check 2
    steps.push({
        explanation: "Step 1: i=0, nums[0]=2.\\nNeed: 9 - 2 = 7.\\nIs 7 in map? No.\\nStore map[2] = 0.",
        render: (engine) => {
            engine.drawText("Two Sum - Step 1", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 80, {0: 'current'}, 50, 10);
            engine.drawText("Checking index 0 (value=2)", 50, 150, '#4cc9f0', 14);
            engine.drawText("Need: 9 - 2 = 7", 50, 175, '#ffaa00', 14);
            
            engine.drawText("Hash Map:", 400, 80, '#eee', 16);
            engine.drawHashMap({ '2': 0 }, 400, 110);
        }
    });
    
    // Step 2: Check 7 - FOUND!
    steps.push({
        explanation: "Step 2: i=1, nums[1]=7.\\nNeed: 9 - 7 = 2.\\nIs 2 in map? YES! map[2] = 0.\\nFOUND! Return [0, 1]",
        render: (engine) => {
            engine.drawText("Two Sum - Step 2", 50, 30, '#e94560', 24);
            engine.drawArray(nums, 50, 80, {1: 'found', 0: 'found'}, 50, 10);
            engine.drawText("Checking index 1 (value=7)", 50, 150, '#4cc9f0', 14);
            engine.drawText("Need: 9 - 7 = 2", 50, 175, '#ffaa00', 14);
            engine.drawText("2 is in map at index 0!", 50, 200, '#2ecc71', 16);
            
            engine.drawText("Hash Map:", 400, 80, '#eee', 16);
            engine.drawHashMap({ '2': 0, '7': 1 }, 400, 110);
            
            engine.drawText("Result: [0, 1]", 50, 250, '#2ecc71', 24);
        }
    });
    
    return steps;
}

function createTwoPointersScene() {
    const s = "racecar";
    const chars = s.split('');
    const steps = [];
    
    steps.push({
        explanation: "Valid Palindrome using Two Pointers.\\nLeft pointer starts at beginning, Right pointer at end.\\nMove towards center, comparing characters.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        render: (engine) => {
            engine.drawText("Two Pointers: Valid Palindrome", 50, 30, '#e94560', 24);
            engine.drawText(`s = "${s}"`, 50, 70, '#4cc9f0', 18);
            engine.drawArray(chars, 50, 120, {}, 50, 10);
            engine.drawTwoPointers(chars, 0, chars.length - 1, 50, 120, 50, 10);
            engine.drawText("Left=0 (r), Right=6 (r) -> Match!", 50, 220, '#2ecc71', 14);
        }
    });
    
    return steps;
}

function createSlidingWindowScene() {
    const s = "abcabcbb";
    const chars = s.split('');
    const steps = [];
    
    steps.push({
        explanation: "Longest Substring Without Repeating Characters.\\nSliding Window: Expand right, contract left when duplicate found.\\nTrack max length seen.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(m,n))",
        render: (engine) => {
            engine.drawText("Sliding Window", 50, 30, '#e94560', 24);
            engine.drawText(`s = "${s}"`, 50, 70, '#4cc9f0', 18);
            
            // Show window [abc]abcbb
            const highlights = {};
            for (let i = 0; i < 3; i++) highlights[i] = 'current';
            engine.drawArray(chars, 50, 120, highlights, 45, 5);
            
            engine.drawText("Window: [a, b, c] -> Length 3", 50, 190, '#2ecc71', 14);
            engine.drawText("Max Length: 3", 50, 215, '#ffaa00', 14);
            
            // Draw window bracket
            engine.drawArrow(50, 100, 185, 100, '#e94560', 'Window');
        }
    });
    
    return steps;
}

// src/utils/math.test.js

// (!) This file is for testing purposes only!
// It allows us to verify that the Vitest & Coverage installation and configuration are working correctly,
//  as well as the generation of the corresponding documentation.

// TODO: This file, and likely the folder containing it (utils), should be deleted in the future.

import { test, expect } from "vitest";
import { calculateTotal } from "../utils/math";

test('calculateTotal function adds two numbers correctly', () => {
    expect(calculateTotal(5, 10)).toBe(15);
});
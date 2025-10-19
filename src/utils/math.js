// src/utils/math.js

// (!) This file is for testing purposes only!
// It allows us to verify that the JSDoc installation and configuration are working correctly,
//  as well as the generation of the corresponding documentation.

// TODO: This file, and likely the folder containing it (utils), should be deleted in the future.

/**
 * <b> Calculates the total number of items needed for a collection. </b>
 * <p>
 * This function takes the current count and adds the new items.
 * @function
 * @param {number} currentCount - The number of items currently in the collection.
 * @param {number} newItems - The number of new items being added.
 * @returns {number} The new total count of items.
 * @example
 * calculateTotal(10, 5);
 * // Returns 15
 */
export const calculateTotal = (currentCount, newItems) => {
  return currentCount + newItems;
};

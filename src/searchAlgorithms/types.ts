export type SearchStep = {
  array: number[];
  highlighted: number[]; // highlight indices
  line: number;          // pseudocode active line
  found?: boolean;       // stops animation when true
};

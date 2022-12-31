export interface BoxLocation {
  row: number;
  index: number;
}

export interface NumberBoxArgs extends BoxLocation {
  num: number;
  boxTags?: string[];
  matchColor?: string;
}

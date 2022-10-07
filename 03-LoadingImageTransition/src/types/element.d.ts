export interface HTML_Element {
  type: string;
  name: string;
  attributes: string;
  elements?: HTML_Element[];
}

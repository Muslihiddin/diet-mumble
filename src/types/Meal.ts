export type Meal = {
  id: string
  image: string
  title: string
  restaurant_title: string
  status: "wanna try" | "not recommended" | "recommended"
  type: "ml"
}
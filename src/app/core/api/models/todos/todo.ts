export interface Todo {
  id: number,
  created_at: string,
  name: string,
  priority: string
}

export interface TodoCreate {
  name: string;
  priority: TodoPriorityEnum | '';
}

export enum TodoPriorityEnum {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = 'critical'
}
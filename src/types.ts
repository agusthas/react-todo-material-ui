export type CategoryType = 'todos' | 'reminders' | 'work' | 'money';

export interface INote {
  category: CategoryType;
  title: string;
  details: string;
  id: number;
}

export type PostNote = Omit<INote, 'id'>;

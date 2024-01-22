export type Entity = {
  id: string,
  name: string
}

export type BookFormProps = {
  categoryList : Entity[] | [];
  authorList : Entity[] | [];
  publisherList : Entity[] | [];
  selectedTitle: string;
  selectedSubtitle: string;
  selectedPublishedDate: Date;
  selectedDE: number;
  selectedCategory: string;
  selectedPublisher: string;
  selectedAuthors: string[];
  onSaveBook: (params: any) => any;
}

export type Book = {
    id: number;
    title: string;
    subtitle: string;
    published_date: string;
    distribution_expense : number;
    publisher: string;
    authors: string[];
    category: string;
}

export interface IBookRowProps {
  book: Book;
  setEditForm: (params: any) => any;
}

export type PublisherData = {
    total_expense: number;
    categories: {
        [categoryName: string]: number;
    };
}

export interface IDistributionExpenses {
    [publisherName: string]: PublisherData | {} | null;
}

export type ChartData = { 
      labels: string[],
      datasets: [
      {
        fill: boolean;
        label: string;
        data: number[] | [];
        borderColor: string[];
        backgroundColor: string[] | null;
      }
    ]
}

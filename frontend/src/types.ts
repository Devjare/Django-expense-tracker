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
  selectedPublishedDate: string;
  selectedDE: number | string;
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

export type ExpenseData = {
    total_expense: number;
    categories: {
        [categoryName: string]: number;
    };
}



export interface IDistributionExpenses {
    [ key: string ]: ExpenseData | null | {};
}

export type SaleData = {
  [ id: string ] : {
    title: string,
    de: number
  }
}

export interface ISalesReport {
    [ key: string ]: SaleData | null | {};
}

export type ChartData = {
  labels: string[] | [] | undefined;
  datasets: {
    data: number[] | [] | undefined;
    borderColor: string[] | [] | undefined;
    backgroundColor: string[] | [] | undefined;
    label: string;
    fill: boolean;
  }[];
};

export type ChartOptions = {
  responsive: boolean;
  maintainAspectRatio: boolean,
  plugins: {
    legend: {
      display: boolean,
      position: "top" | "left" | "bottom" | "right",
    },
    title: {
      display: boolean,
      text: string,
    },
    tooltip?: {
      callbacks?: { 
        title?: (params: any) => any;
      }
    }
  },
  interaction?: {
    intersect?: false,
    mode?: 'index'
  },
};

export interface IChartProps {
  reportData: IDistributionExpenses | ISalesReport | {};
  chartTitle?: string | undefined;
}

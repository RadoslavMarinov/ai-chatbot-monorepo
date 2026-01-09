interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
}

export class BooksModel {
  static async all() :Promise<Book[]> {
    console.log(`🎉 List all books = `);
    await this.waitMs(1000);
    return [
      {
        id: "1",
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
      },
      {
        id: "2",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
      },
      {
        id: "3",
        title: "The Silmarillion",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
      },
      {
        id: "4",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
      },
      {
        id: "5",
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Classic",
      },
      {
        id: "6",
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        id: "7",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
      {
        id: "8",
        title: "Moby Dick",
        author: "Herman Melville",
        genre: "Adventure",
      },
      {
        id: "9",
        title: "War and Peace",
        author: "Leo Tolstoy",
        genre: "Historical Fiction",
      },
      {
        id: "10",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Coming-of-age",
      },
      {
        id: "11",
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Dystopian",
      },
      {
        id: "12",
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Dystopian",
      },
      {
        id: "13",
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        genre: "Fantasy",
      },
      {
        id: "14",
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        genre: "Gothic Fiction",
      },
      {
        id: "15",
        title: "Wuthering Heights",
        author: "Emily Brontë",
        genre: "Gothic Fiction",
      },
      {
        id: "16",
        title: "The Adventures of Huckleberry Finn",
        author: "Mark Twain",
        genre: "Adventure",
      },
      {
        id: "17",
        title: "The Adventures of Tom Sawyer",
        author: "Mark Twain",
        genre: "Adventure",
      },
      {
        id: "18",
        title: "Frankenstein",
        author: "Mary Shelley",
        genre: "Gothic Fiction",
      },
      {
        id: "19",
        title: "Dracula",
        author: "Bram Stoker",
        genre: "Gothic Fiction",
      },
      {
        id: "20",
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        genre: "Gothic Fiction",
      },
      {
        id: "21",
        title: "Anna Karenina",
        author: "Leo Tolstoy",
        genre: "Historical Fiction",
      },
      {
        id: "22",
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        genre: "Philosophical Fiction",
      },
      {
        id: "23",
        title: "The Brothers Karamazov",
        author: "Fyodor Dostoevsky",
        genre: "Philosophical Fiction",
      },
      {
        id: "24",
        title: "Don Quixote",
        author: "Miguel de Cervantes",
        genre: "Satire",
      },
      {
        id: "25",
        title: "Ulysses",
        author: "James Joyce",
        genre: "Modernist",
      },
      {
        id: "26",
        title: "One Hundred Years of Solitude",
        author: "Gabriel García Márquez",
        genre: "Magical Realism",
      },
      {
        id: "27",
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fantasy",
      },
      {
        id: "28",
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        genre: "Science Fiction",
      },
      {
        id: "29",
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
      },
      {
        id: "30",
        title: "The Road",
        author: "Cormac McCarthy",
        genre: "Post-apocalyptic",
      },
    ];
  }

  static async findByName(name: string): Promise<Book[]> {
    console.log(`🎉 findByName = `, name);
    return (await this.all()).filter((book) => book.title.includes(name));
  }

  static async findById(id: string):  Promise<Book|undefined>    {
    console.log(`🎉 findById = `, id);
    return (await this.all()).find((book) => book.id === id);
  }

  static async findByGenre(genre: string): Promise<Book[] | undefined> {
    console.log(`🎉 findByGenre = `, genre);
    return  ( await this.all()).filter((book) => book.genre === genre);
  }

  static async findByAuthor(author: string): Promise<Book[] | undefined> {
    console.log(`🎉 findByAuthor = `, author);
    return (await this.all()).filter((book) => book.author === author);
  }

  private static waitMs(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

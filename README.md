# alx-project-0x14
# ALX Project 0x14 — Reading API Documentation  
Understanding how to consume an API begins with properly reading and interpreting its documentation.  
This project focuses on analyzing the MoviesDatabase API to prepare for later integration using TypeScript and Next.js.

---

## API Overview  
The **MoviesDatabase API** provides access to a wide catalog of movies, TV shows, and related metadata.  
It supports querying titles, filtering by attributes such as year and genre, retrieving detailed information, and paginating through large collections of results.

Key features include:

- Large collection of movies with metadata (title, year, genres, plot, poster, etc.)
- Searching and filtering capability (by title, year, genre)
- Pagination for handling large result sets
- Access to movie details via ID–based lookup
- Consistent JSON request and response format
- Supports authenticated requests using an API key
- Rate-limited public API

---

## Version  
The current version of the MoviesDatabase API (based on documentation) is:  

**v1**

---

## Available Endpoints  

### **1. `/titles`**  
Retrieves a list of movies.  
Supports filtering and pagination using query parameters:

- `page` — The page number to fetch  
- `limit` — Number of results per page  
- `year` — Filter by release year  
- `genre` — Filter by genre  
- `q` — Search query (title)

---

### **2. `/titles/{id}`**  
Returns detailed information for a movie by its unique ID.

---

### **3. `/titles/search`**  
Allows keyword–based search for movies by title.

---

### **4. `/genres`**  
Returns a complete list of all movie genres.

---

### **5. `/titles/random`**  
Returns a random movie result (useful for discover–style UI).

---

## Request and Response Format  

### **Request Structure**  
A typical request includes:

- **HTTP Method**: `GET`  
- **Endpoint**: `/titles?page=1&limit=20`  
- **Headers**:  
  ```json
  {
    "Content-Type": "application/json",
    "Authorization": "Bearer <API_KEY>"
  }

fetch("https://api.moviesdatabase.com/v1/titles?page=1&limit=20", {
  headers: {
    Authorization: `Bearer ${process.env.MOVIES_DB_API_KEY}`
  }
});

{
  "page": 1,
  "totalPages": 500,
  "totalResults": 10000,
  "results": [
    {
      "id": "tt0111161",
      "title": "The Shawshank Redemption",
      "year": 1994,
      "genre": ["Drama"],
      "overview": "Two imprisoned men bond over a number of years...",
      "poster": "https://image.url/poster.jpg"
    }
  ]
}

Authorization: Bearer YOUR_API_KEY

{
  "error": "Invalid API key",
  "status": 401
}

const response = await fetch(url);

if (!response.ok) {
  throw new Error(`Error: ${response.status} ${response.statusText}`);
}

const data = await response.json();



## What is moment?
- Moment is a global social network for content discussion and discovery. Use it as a diary to record and share your opinion about content whether it’s a good book you read, this ‘must watch’ tv series your friend recommends, the new launch of this awesome game for PS5, or just a chill movie you enjoyed watching with your partner last Friday.  Showcase your favorites on your profile page. Rate, review, and tag content as you add them. Find and follow your friends to see what they’re enjoying. Keep a watchlist of content you’d like to see, and create lists/collections on any given topic.
- Try as we might, we could not find an appropriate venue to write about and share the content we consumed, to keep track of what we watch, played, read, and to keep up with the popular sentiment about new (and old) content we consumed in a more meaningful way than just “three stars out of five”.
- We thought, wouldn’t it be cool to look back after a year and recall what you watched, played, read, what you loved, and perhaps, what you wrote? You can’t link to an [IMDb](http://imdb.com/)
profile, steam, or Goodreads but maybe we could build a place you’d be proud to share. A single place to showcase your life in content. We’re moment.

#### API Spec
##### Client-service
###### - Get most rated movies 
`GET -> /:5868/movies/most-rated`
Response:
List of movies
```json
[
  {
    "adult": false,
    "backdrop_path": "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
    "genre_ids": [
      18,
      80
    ],
    "id": 278,
    "original_language": "en",
    "original_title": "The Shawshank Redemption",
    "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    "popularity": 80.772,
    "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "release_date": "1994-09-23",
    "title": "The Shawshank Redemption",
    "video": false,
    "vote_average": 8.7,
    "vote_count": 20949
  },
...
}
```

###### - Get popular movies 
`GET -> /:5868/movies/popular`
Response:
List of movies
```json
[
  {
    "adult": false,
    "backdrop_path": "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
    "genre_ids": [
      18,
      80
    ],
    "id": 278,
    "original_language": "en",
    "original_title": "The Shawshank Redemption",
    "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    "popularity": 80.772,
    "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "release_date": "1994-09-23",
    "title": "The Shawshank Redemption",
    "video": false,
    "vote_average": 8.7,
    "vote_count": 20949
  },
  ...
}
```
###### - Get upcoming movies 
`GET -> /:5868/movies/popular`
Response:
List of movies
```json
[
  {
    "adult": false,
    "backdrop_path": "/wPU78OPN4BYEgWYdXyg0phMee64.jpg",
    "genre_ids": [
      18,
      80
    ],
    "id": 278,
    "original_language": "en",
    "original_title": "The Shawshank Redemption",
    "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
    "popularity": 80.772,
    "poster_path": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    "release_date": "1994-09-23",
    "title": "The Shawshank Redemption",
    "video": false,
    "vote_average": 8.7,
    "vote_count": 20949
  },
  ...
}
```

###### - Get movie details 
`GET -> /:5868/movies/:movie`
Response:
Movie details
```json
{
  "adult": false,
  "backdrop_path": "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
  "belongs_to_collection": null,
  "budget": 160000000,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 12,
      "name": "Adventure"
    }
  ],
  "homepage": "https://www.warnerbros.com/movies/inception",
  "id": 27205,
  "imdb_id": "tt1375666",
  "original_language": "en",
  "original_title": "Inception",
  "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
  "popularity": 133.848,
  "poster_path": "/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
  "production_companies": [
    {
      "id": 923,
      "logo_path": "/5UQsZrfbfG2dYJbx8DxfoTr2Bvu.png",
      "name": "Legendary Pictures",
      "origin_country": "US"
    },
    {
      "id": 9996,
      "logo_path": "/3tvBqYsBhxWeHlu62SIJ1el93O7.png",
      "name": "Syncopy",
      "origin_country": "GB"
    },
    {
      "id": 174,
      "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
      "name": "Warner Bros. Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "GB",
      "name": "United Kingdom"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2010-07-15",
  "revenue": 825532764,
  "runtime": 148,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    },
    {
      "english_name": "Japanese",
      "iso_639_1": "ja",
      "name": "日本語"
    },
    {
      "english_name": "Swahili",
      "iso_639_1": "sw",
      "name": "Kiswahili"
    }
  ],
  "status": "Released",
  "tagline": "Your mind is the scene of the crime.",
  "title": "Inception",
  "video": false,
  "vote_average": 8.4,
  "vote_count": 31136
}
```

###### - Get most rated tv shows 
`GET -> /:5868/tv-shows/most-rated`
Response:
List of tv shows
```json
[
  {
    "backdrop_path": "/7q448EVOnuE3gVAx24krzO7SNXM.jpg",
    "first_air_date": "2021-09-03",
    "genre_ids": [
      10764
    ],
    "id": 130392,
    "name": "The D'Amelio Show",
    "origin_country": [
      "US"
    ],
    "original_language": "en",
    "original_name": "The D'Amelio Show",
    "overview": "From relative obscurity and a seemingly normal life, to overnight success and thrust into the Hollywood limelight overnight, the D’Amelios are faced with new challenges and opportunities they could not have imagined.",
    "popularity": 14.366,
    "poster_path": "/z0iCS5Znx7TeRwlYSd4c01Z0lFx.jpg",
    "vote_average": 9.4,
    "vote_count": 2657
  },
  ...
}
```
###### - Get popular tv shows 
`GET -> /:5868/tv-shows/popular`
Response:
List of tv shows
```json
[
  {
    "backdrop_path": "/7q448EVOnuE3gVAx24krzO7SNXM.jpg",
    "first_air_date": "2021-09-03",
    "genre_ids": [
      10764
    ],
    "id": 130392,
    "name": "The D'Amelio Show",
    "origin_country": [
      "US"
    ],
    "original_language": "en",
    "original_name": "The D'Amelio Show",
    "overview": "From relative obscurity and a seemingly normal life, to overnight success and thrust into the Hollywood limelight overnight, the D’Amelios are faced with new challenges and opportunities they could not have imagined.",
    "popularity": 14.366,
    "poster_path": "/z0iCS5Znx7TeRwlYSd4c01Z0lFx.jpg",
    "vote_average": 9.4,
    "vote_count": 2657
  },
  ...
}
```


###### - Get latest tv shows 
`GET -> /:5868/tv-shows/latest`
Response:
List of tv shows
```json
[
  {
    "backdrop_path": "/7q448EVOnuE3gVAx24krzO7SNXM.jpg",
    "first_air_date": "2021-09-03",
    "genre_ids": [
      10764
    ],
    "id": 130392,
    "name": "The D'Amelio Show",
    "origin_country": [
      "US"
    ],
    "original_language": "en",
    "original_name": "The D'Amelio Show",
    "overview": "From relative obscurity and a seemingly normal life, to overnight success and thrust into the Hollywood limelight overnight, the D’Amelios are faced with new challenges and opportunities they could not have imagined.",
    "popularity": 14.366,
    "poster_path": "/z0iCS5Znx7TeRwlYSd4c01Z0lFx.jpg",
    "vote_average": 9.4,
    "vote_count": 2657
  },
  ...
}
```

###### - Get tv show details 
`GET -> /:5868/tv-shows/:tvshow`
Response:
Tv show details
```json
{
  "adult": false,
  "backdrop_path": "/x3i8okUNTx0s7A7DlXAZjlxHFP5.jpg",
  "created_by": [
    {
      "id": 1223737,
      "credit_id": "5256cbd719c2956ff60696a0",
      "name": "James Manos, Jr.",
      "gender": 0,
      "profile_path": "/iFPjg94U6LFZnp6oaN1Twift0Hn.jpg"
    }
  ],
  "episode_run_time": [
    55
  ],
  "first_air_date": "2006-10-01",
  "genres": [
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 9648,
      "name": "Mystery"
    }
  ],
  "homepage": "http://www.sho.com/dexter",
  "id": 1405,
  "in_production": false,
  "languages": [
    "en"
  ],
  "last_air_date": "2013-09-22",
  "last_episode_to_air": {
    "air_date": "2013-09-22",
    "episode_number": 12,
    "id": 953321,
    "name": "Remember the Monsters?",
    "overview": "Season 8 and the series conclude with Dexter facing impossible odds. With a hurricane threatening Miami, Dexter becomes determined to end things.",
    "production_code": "",
    "season_number": 8,
    "still_path": "/j2x4HNzRvhBLqIRU2gevZCCR2u6.jpg",
    "vote_average": 5.1,
    "vote_count": 53
  },
  "name": "Dexter",
  "next_episode_to_air": null,
  "networks": [
    {
      "name": "Showtime",
      "id": 67,
      "logo_path": "/Allse9kbjiP6ExaQrnSpIhkurEi.png",
      "origin_country": "US"
    }
  ],
  "number_of_episodes": 96,
  "number_of_seasons": 8,
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_name": "Dexter",
  "overview": "Dexter Morgan, a blood spatter pattern analyst for the Miami Metro Police also leads a secret life as a serial killer, hunting down criminals who have slipped through the cracks of justice.",
  "popularity": 212.935,
  "poster_path": "/58H6Ctze1nnpS0s9vPmAAzPcipR.jpg",
  "production_companies": [
    {
      "id": 4343,
      "logo_path": "/rXq1B1Hnkdnw6soz1zoGcslK3wb.png",
      "name": "Showtime Networks",
      "origin_country": "US"
    },
    {
      "id": 17594,
      "logo_path": null,
      "name": "John Goldwyn Productions",
      "origin_country": "US"
    },
    {
      "id": 12261,
      "logo_path": null,
      "name": "The Colleton Company",
      "origin_country": "US"
    },
    {
      "id": 17595,
      "logo_path": null,
      "name": "Clyde Phillips Productions",
      "origin_country": "US"
    },
    {
      "id": 17596,
      "logo_path": null,
      "name": "Devilina Productions",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "seasons": [
    {
      "air_date": "2009-10-25",
      "episode_count": 35,
      "id": 59533,
      "name": "Specials",
      "overview": "",
      "poster_path": "/Ast1fRXfgqMPskoKVEQYPlCNA3w.jpg",
      "season_number": 0
    },
    {
      "air_date": "2006-10-01",
      "episode_count": 12,
      "id": 59499,
      "name": "Season 1",
      "overview": "By day, mild-mannered Dexter is a blood-spatter analyst for the Miami police. But at night, he is a serial killer who only targets other murderers.",
      "poster_path": "/n2YLt7ZRutoaXPWZuGVS7wCqYi4.jpg",
      "season_number": 1
    },
    {
      "air_date": "2007-09-30",
      "episode_count": 12,
      "id": 59500,
      "name": "Season 2",
      "overview": "In season two, the bodies of Dexter's victims are uncovered and an investigation is launched in Dexter's own department to find the killer, dubbed the \"Bay Harbor Butcher.\" Debra struggles to recover, and Rita sends Dexter to Narcotics Anonymous meetings when she suspects that he has an addiction. Sergeant James Doakes, stalks Dexter, suspecting that he is connected with the \"Ice Truck Killer\" killings.",
      "poster_path": "/hofRzAq3KixpwTf6WiTMBDK2e6Y.jpg",
      "season_number": 2
    },
    {
      "air_date": "2008-09-28",
      "episode_count": 12,
      "id": 59502,
      "name": "Season 3",
      "overview": "After a runin with a man, Dexter initiates a friendship with his brother, Assistant District Attorney Miguel Prado. In the meantime, Rita discovers that she is pregnant, and Debra investigates the murders of a new serial killer, called \"The Skinner,\" hoping to gain a promotion to detective.",
      "poster_path": "/hD1RNFbJWgZaxh3kD8sAL5tkktv.jpg",
      "season_number": 3
    },
    {
      "air_date": "2009-09-27",
      "episode_count": 12,
      "id": 59504,
      "name": "Season 4",
      "overview": "Dexter as a father and husband struggles to figure out how to survive for years to come. He seeks to learn from Arthur Mitchell, a serial killer and family man, who has murdered for over thirty years without being discovered.",
      "poster_path": "/3FMfhSmx89TEQ1UFv4sA7owxLnR.jpg",
      "season_number": 4
    },
    {
      "air_date": "2010-09-26",
      "episode_count": 12,
      "id": 59506,
      "name": "Season 5",
      "overview": "In season five, Dexter comes to terms with the aftermath of the Season 4 finale, stopping a group of serial rapists and avoiding a corrupt cop who learns his deadly secret.",
      "poster_path": "/nPCBFGDTYgTCGl13Wy4dYS6LEcd.jpg",
      "season_number": 5
    },
    {
      "air_date": "2011-10-02",
      "episode_count": 12,
      "id": 59509,
      "name": "Season 6",
      "overview": "Season six follows Dexter's and Miami Metro's investigations into a string of bizarre ritualistic killings featuring overtly religious apocalyptic symbolism.",
      "poster_path": "/hfOWFcCYYFgirEpoagsnXeTbCJ3.jpg",
      "season_number": 6
    },
    {
      "air_date": "2012-09-30",
      "episode_count": 12,
      "id": 59510,
      "name": "Season 7",
      "overview": "Season seven follows Dexter's tangles with a Ukrainian mob boss and introduces Hannah McKay, a mysterious widow with a green thumb and a checkered past.",
      "poster_path": "/lM4EY2L324exlZ1hF2YpBM0a97J.jpg",
      "season_number": 7
    },
    {
      "air_date": "2013-06-30",
      "episode_count": 12,
      "id": 59512,
      "name": "Season 8",
      "overview": "As Deb struggles to deal with the consequences of her actions, a mysterious woman comes to work with Miami Metro, offering first-hand information on Dexter's past.",
      "poster_path": "/veDEAb7pXaSNvvPXhwa1PiFlca9.jpg",
      "season_number": 8
    }
  ],
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Ended",
  "tagline": "A serial killer with a heart..... just pray it's not yours",
  "type": "Scripted",
  "vote_average": 8.2,
  "vote_count": 2858
}
```

###### - Get most rated books 
`GET -> /:5868/books/most-rated`
Response:
List of books
```json
[
  {
    "title": "To Kill a Mockingbird (Enhanced Edition)",
    "authors": [
      "Harper Lee"
    ],
    "publisher": "Harper Collins",
    "publishedDate": "2014-11-04",
    "description": "Voted America's Best-Loved Novel in PBS's The Great American Read Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9780062369635"
      },
      {
        "type": "ISBN_10",
        "identifier": "0062369636"
      }
    ],
    "readingModes": {
      "text": true,
      "image": false
    },
    "pageCount": 336,
    "printType": "BOOK",
    "categories": [
      "Fiction"
    ],
    "averageRating": 4,
    "ratingsCount": 5,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.11.13.0.preview.2",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&printsec=frontcover&dq=To+Kill+a+Mockingbird&hl=&cd=1&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&dq=To+Kill+a+Mockingbird&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/To_Kill_a_Mockingbird_Enhanced_Edition.html?hl=&id=-D8WBAAAQBAJ"
  },
  ...
}
```

###### - Get popular books 
`GET -> /:5868/books/popular`
Response:
List of books
```json
[
  {
    "title": "To Kill a Mockingbird (Enhanced Edition)",
    "authors": [
      "Harper Lee"
    ],
    "publisher": "Harper Collins",
    "publishedDate": "2014-11-04",
    "description": "Voted America's Best-Loved Novel in PBS's The Great American Read Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9780062369635"
      },
      {
        "type": "ISBN_10",
        "identifier": "0062369636"
      }
    ],
    "readingModes": {
      "text": true,
      "image": false
    },
    "pageCount": 336,
    "printType": "BOOK",
    "categories": [
      "Fiction"
    ],
    "averageRating": 4,
    "ratingsCount": 5,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.11.13.0.preview.2",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&printsec=frontcover&dq=To+Kill+a+Mockingbird&hl=&cd=1&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&dq=To+Kill+a+Mockingbird&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/To_Kill_a_Mockingbird_Enhanced_Edition.html?hl=&id=-D8WBAAAQBAJ"
  },
  ...
}
```

###### - Get upcoming books 
`GET -> /:5868/books/upcoming`
Response:
List of books
```json
[
  {
    "title": "To Kill a Mockingbird (Enhanced Edition)",
    "authors": [
      "Harper Lee"
    ],
    "publisher": "Harper Collins",
    "publishedDate": "2014-11-04",
    "description": "Voted America's Best-Loved Novel in PBS's The Great American Read Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred One of the most cherished stories of all time, To Kill a Mockingbird has been translated into more than forty languages, sold more than forty million copies worldwide, served as the basis for an enormously popular motion picture, and was voted one of the best novels of the twentieth century by librarians across the country. A gripping, heart-wrenching, and wholly remarkable tale of coming-of-age in a South poisoned by virulent prejudice, it views a world of great beauty and savage inequities through the eyes of a young girl, as her father—a crusading local lawyer—risks everything to defend a black man unjustly accused of a terrible crime.",
    "industryIdentifiers": [
      {
        "type": "ISBN_13",
        "identifier": "9780062369635"
      },
      {
        "type": "ISBN_10",
        "identifier": "0062369636"
      }
    ],
    "readingModes": {
      "text": true,
      "image": false
    },
    "pageCount": 336,
    "printType": "BOOK",
    "categories": [
      "Fiction"
    ],
    "averageRating": 4,
    "ratingsCount": 5,
    "maturityRating": "NOT_MATURE",
    "allowAnonLogging": true,
    "contentVersion": "1.11.13.0.preview.2",
    "panelizationSummary": {
      "containsEpubBubbles": false,
      "containsImageBubbles": false
    },
    "imageLinks": {
      "smallThumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
      "thumbnail": "http://books.google.com/books/content?id=-D8WBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "previewLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&printsec=frontcover&dq=To+Kill+a+Mockingbird&hl=&cd=1&source=gbs_api",
    "infoLink": "http://books.google.com/books?id=-D8WBAAAQBAJ&dq=To+Kill+a+Mockingbird&hl=&source=gbs_api",
    "canonicalVolumeLink": "https://books.google.com/books/about/To_Kill_a_Mockingbird_Enhanced_Edition.html?hl=&id=-D8WBAAAQBAJ"
  },
  ...
}
```

###### - Get book details 
`GET -> /:5868/books/:book`
Response:
Book details
```json
{
  "title": "Man's Search for Meaning, Gift Edition",
  "authors": [
    "Viktor E. Frankl"
  ],
  "publisher": "Beacon Press",
  "publishedDate": "2014-10-28",
  "description": "A book for finding purpose and strength in times of great despair, the international best-seller is still just as relevant today as when it was first published. “This is a book I reread a lot . . . it gives me hope . . . it gives me a sense of strength.” —Anderson Cooper, Anderson Cooper 360/CNN This seminal book, which has been called “one of the outstanding contributions to psychological thought” by Carl Rogers and “one of the great books of our time” by Harold Kushner, has been translated into more than fifty languages and sold over sixteen million copies. “An enduring work of survival literature,” according to the New York Times, Viktor Frankl’s riveting account of his time in the Nazi concentration camps, and his insightful exploration of the human will to find meaning in spite of the worst adversity, has offered solace and guidance to generations of readers since it was first published in 1946. At the heart of Frankl’s theory of logotherapy (from the Greek word for “meaning”) is a conviction that the primary human drive is not pleasure, as Freud maintained, but rather the discovery and pursuit of what the individual finds meaningful. Today, as new generations face new challenges and an ever more complex and uncertain world, Frankl’s classic work continues to inspire us all to find significance in the very act of living, in spite of all obstacles. This gift edition come with endpapers, supplementary photographs, and several of Frankl’s previously unpublished letters, speeches, and essays. This book was published with two different covers. Customers will be shipped one of the two at random.",
  "industryIdentifiers": [
    {
      "type": "ISBN_13",
      "identifier": "9780807060100"
    },
    {
      "type": "ISBN_10",
      "identifier": "0807060100"
    }
  ],
  "readingModes": {
    "text": false,
    "image": false
  },
  "pageCount": 208,
  "printType": "BOOK",
  "categories": [
    "Psychology"
  ],
  "averageRating": 4.5,
  "ratingsCount": 2,
  "maturityRating": "NOT_MATURE",
  "allowAnonLogging": false,
  "contentVersion": "0.3.0.0.preview.0",
  "panelizationSummary": {
    "containsEpubBubbles": false,
    "containsImageBubbles": false
  },
  "imageLinks": {
    "smallThumbnail": "http://books.google.com/books/content?id=RMqMDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    "thumbnail": "http://books.google.com/books/content?id=RMqMDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  },
  "language": "en",
  "previewLink": "http://books.google.com/books?id=RMqMDQAAQBAJ&printsec=frontcover&dq=mans+search+for+meaning&hl=&cd=1&source=gbs_api",
  "infoLink": "http://books.google.com/books?id=RMqMDQAAQBAJ&dq=mans+search+for+meaning&hl=&source=gbs_api",
  "canonicalVolumeLink": "https://books.google.com/books/about/Man_s_Search_for_Meaning_Gift_Edition.html?hl=&id=RMqMDQAAQBAJ"
}
```

# Cover tech challenge

### Recipient: James Barzegar

- james.barzegar@gmail.com
- [Github](http://github.com/jbarzegar)
- [LinkedIn](https://www.linkedin.com/in/james-barzegar-686a74106/)

### Challenge

Using the Marketcheck Cars Search API, build something that can accepts car manufacturer,
model and year and searches nearby dealerships for local inventory (within 10 km radius)
closest to the user and be able to switch cities (ie, select Montrel over Toronto). Bonus points
for calculating average price for the user entered and similar vehicles.

### Tech Stack

- [MarketShare API](https://www.marketcheck.com/)
- [Open Cage API](https://opencagedata.com/api)

- [React](https://reactjs.org/)
- [Rebass](https://rebassjs.org/)
- [Emotion](https://emotion.sh)
- [wouter](https://github.com/molefrog/wouter)

### To run

I left the .env file in the code base so you can use those api keys.
Ended up using throwaway accounts for both marketshare and open cage so sharing keys should be alright at least for this.

```
  yarn
  yarn build
  yarn serve
```

or

```
  npm install
  npm run build
  npm run serve
```

### Dev notes

Due to time constraints I couldn't apply the level of visual polish that I felt was appropriate.

I wanted to prioritize making a seamless experience, Especially with switching locations/searching for locations. Thus I left the visuals a little simpler to prioritize the overall UX

If I had more time/This was more than a tech challenge There's a number of things I would have done differently.

- Create a set of component library/style system that matches the brand
- improve input validation
- Better handle api rate limiting
- Create a view to allow the user to compare prices between a set of listings
- Sort listings by distance, longest to shortest by default. Allowing the user to configure as they see fit.
- Use typescript to keep track of props/context types

This was also a pretty fun learning experience as I have virtually zero knowledge on cars...

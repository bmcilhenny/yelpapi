const apiKey = '3SCmH-z2j_wP6KAAdTE0ALapZTGmK6xCDySNGGcc5RB24BgTIlUUmj46FqasJfKlDHJ8Y2zioLtM9t_2ixSEM-dgNwN0EmSQqmTsd_0eH6rzfV7TJdDk1G4aNeTsWnYx';
const clientId = 'f3tkfKloHb4bwNp6yYb42w';

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      'headers': {
        'Authorization': `Bearer ${apiKey}`
      }})
    .then(resp => resp.json())
    .then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageUrl: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }

        });
      }
    })
  }
}

export default Yelp;

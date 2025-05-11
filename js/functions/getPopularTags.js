export function getPopularTags(listingToCheck) {
    const tagCounts = {};
    console.log(listingToCheck);

    listingToCheck.forEach(listing => {
      if (listing.tags && Array.isArray(listing.tags)) {
        listing.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
  
    const sortedTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); 

    return sortedTags;
  }
  
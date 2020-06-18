//useful stuff from mvp-client:

var companyReviews: any = [];
var companyReviewIds: any = [];
var companyLocations: any = Meteor.users
  .find({
    "profile.companyId": companyId,
    "roles.user": { $in: ["location"] },
    "profile.status": 1,
  })
  .fetch();
for (var i = 0; i < companyLocations.length; i++) {
  if (companyLocations[i].profile.location.facebookPageId) {
    var facebookReviewDataCollectionId =
      companyLocations[i]._id +
      "-" +
      companyLocations[i].profile.location.facebookPageId;
    var existedData = ReviewDataCollection.find({
      id: facebookReviewDataCollectionId,
      type: "facebook",
    }).fetch();
    if (existedData && existedData.length > 0 && existedData[0].data) {
      for (var f = 0; f < existedData[0].data.length; f++) {
        var ratingValue =
          existedData[0].data[f].open_graph_story.data.rating.value;
        if (
          allowRatings.indexOf(ratingValue) >= 0 &&
          companyReviewIds.indexOf(existedData[0].data[f].open_graph_story.id) <
            0
        ) {
          var fbUserAvatar =
            "https://graph.facebook.com/" +
            existedData[0].data[f].reviewer.id +
            "/picture?type=normal&access_token=" +
            companyLocations[i].profile.location.facebookPageAccessToken;
          companyReviews.push({
            id: existedData[0].data[f].open_graph_story.id,
            time: existedData[0].data[f].open_graph_story.start_time,
            rating: ratingValue,
            comment: existedData[0].data[f].open_graph_story.data.review_text,
            type: "facebook",
            reviewer: existedData[0].data[f].reviewer,
            fbUserAvatar: fbUserAvatar,
            redirectUrl:
              "https://facebook.com/" +
              companyLocations[i].profile.location.facebookPageId +
              "/reviews",
          });
          companyReviewIds.push(existedData[0].data[f].open_graph_story.id);
        }
      }
    }
  }
  if (companyLocations[i].profile.location.googleBusinessLocationName) {
    var googleReviewDataCollectionId =
      companyLocations[i]._id +
      "/" +
      companyLocations[i].profile.location.googleBusinessLocationName;
    var existedGoogleData = ReviewDataCollection.find({
      id: googleReviewDataCollectionId,
      type: "google",
    }).fetch();
    if (
      existedGoogleData &&
      existedGoogleData.length > 0 &&
      existedGoogleData[0].data
    ) {
      for (var g = 0; g < existedGoogleData[0].data.length; g++) {
        var ratingValue = existedGoogleData[0].data[g].rating;
        if (
          allowRatings.indexOf(ratingValue) >= 0 &&
          companyReviewIds.indexOf(existedGoogleData[0].data[g].reviewId) < 0
        ) {
          companyReviews.push({
            id: existedGoogleData[0].data[g].reviewId,
            time: existedGoogleData[0].data[g].createTime,
            rating: ratingValue,
            comment: existedGoogleData[0].data[g].comment,
            type: "google",
            reviewer: existedGoogleData[0].data[g].reviewer,
            redirectUrl:
              "https://search.google.com/local/writereview?placeid=" +
              companyLocations[i].profile.location.placeId,
          });
          companyReviewIds.push(existedGoogleData[0].data[g].reviewId);
        }
      }
    }
  }
}

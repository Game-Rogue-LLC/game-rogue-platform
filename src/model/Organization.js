export const Organization = {
  uid: "",
  name: "",
  tagline: "",
  // Content Block
  banner: "",   // Image Url
  title: "",    // Title
  url: "",
  description: "",    // Content Description
  // Social
  youtube: true,
  twitter: true,
  instagram: true,
  twitch: true,
  discord: true,
  // Funding
  credit: true,
  paypal: true,
  actualFund: 0,
  crowdFund: 0,
  //
  createdAt: new Date(),
  deleted: false
}

export default Organization;
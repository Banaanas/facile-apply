import { LinkedinPost } from "@prisma/client";

export type TransformedScrapedLinkedinPost = Omit<LinkedinPost, "id">;

export interface RawLinkedinPostData {
  data: {
    searchDashClustersByAll: SearchDashClustersByAll;
  };
}

interface SearchDashClustersByAll {
  paging: RawLinkedinPaging;
  elements: Array<SearchClusterViewModel>;
}

export interface RawLinkedinPaging {
  count: number;
  start: number;
  total: number;
}

export interface SearchClusterViewModel {
  position: number;
  items: Array<PostItem>;
}

export interface PostItem {
  item: PostEntityResult;
  position: number;
}

interface PostEntityResult {
  // entityResult is main part of each post contains post's main details
  entityResult?: {
    title: TextViewModel; // title of the post
    summary: TextViewModel; // summary of the post
    secondarySubtitle?: TextViewModel; // contains relative timestamp of the post such as '1h' or '2d'
    actorNavigationUrl: string; // URL leading to the author's LinkedIn profile
    image?: ImageViewModel; // Image object which might contain the profile picture of the author
    navigationUrl: string; // URL of the post
    trackingUrn: string; // Unique identifier for the post
  };
}

interface TextViewModel {
  text: string; // basic text entity
}

interface ImageViewModel {
  attributes: ImageAttribute[]; // attributes of the image
}

interface ImageAttribute {
  detailData: DetailData; // detailed data of image attribute
}

interface DetailData {
  nonEntityProfilePicture?: NonEntityProfilePicture; // Profile picture object containing vector image info
}

interface NonEntityProfilePicture {
  vectorImage: VectorImage; // vector image info, might contain URL of the profile picture
  profile: Profile;
}

interface VectorImage {
  artifacts: Array<VectorArtifact>; // array containing details about each vector artifact of the profile picture
}

interface VectorArtifact {
  // URL of the profile picture
  fileIdentifyingUrlPathSegment: string; // the URL segment of profile picture file
}

interface Profile {
  entityUrn: string; // To get the vanityName or unique identifier.
}

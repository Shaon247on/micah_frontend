export interface AboutUsStory {
  id: string;
  title: string;
  subtitle: string;
  storyTitle: string;
  storySubtitle: string;
  cards: Card[];
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  cardTitle: string;
  cardSubtitle: string;
}

export interface AboutUsResponse {
  status: string;
  data: AboutUsStory;
}

export interface AboutUsUpdateResponse {
  status: string;
  message: string;
  data?: AboutUsStory;
}



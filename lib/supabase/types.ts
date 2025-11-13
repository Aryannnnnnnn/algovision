export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  author_id: string;
  status: 'draft' | 'published';
  featured_image?: string;
  views: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  status: 'draft' | 'published';
  featured_image?: string;
  views: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: Blog;
        Insert: Omit<Blog, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<Blog, 'id' | 'created_at'>>;
      };
      case_studies: {
        Row: CaseStudy;
        Insert: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<CaseStudy, 'id' | 'created_at'>>;
      };
    };
  };
}

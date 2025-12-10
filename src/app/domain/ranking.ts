export interface Ranking {
    position?: number;
    university?: string;
    category?: string;
    subcategory?: string;
    country?: string;
    codeCountry?: string;
    work?: string;
    codeWork?: string;
    score?: number;
}


export interface UploadInfoDto {
    sucess?: boolean;
    message?: string;
    year?: number;
    processedRecords?: number;
    errors?: string[];
}

export interface ResearcherRankingResponseDto {
    id: number;
    year: number;
    position: number;
    name: string;
    score: number;
    position2: number;
    category: string;
    subcategory: string
    subcategory2: string
    university: string
    codeCountry: string
    codeWorking: string
    profile: string
}

export interface PaginatedRankingResponseDto {
    content: ResearcherRankingResponseDto[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;    
}

export interface RankingFiltersDto {
    years: number[];
    categories: string[];
    subcategories: string[];
    subcategory2List: string[];
    countries: string[];
    institutions: string[];
}

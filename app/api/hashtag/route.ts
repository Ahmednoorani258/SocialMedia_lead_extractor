// app/api/search/route.ts
import { NextResponse } from "next/server";
import { Post } from "@/types/types";

async function fetchDynamicInstagramData(location: string) {
  const BaseUrl = "https://ensembledata.com/apis/";
  const Token = process.env.ENSEMBLE_API_TOKEN;

  if (!Token) {
    throw new Error("ENSEMBLE_API_TOKEN is not set");
  }

  try {
    const response = await fetch(
      `${BaseUrl}instagram/hashtag/posts?name=${location}&cursor=&get_author_info=true&token=${Token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.json(); // Parse the response body
      console.error("Error response body:", errorBody);

      // Check if the error indicates the API limit has been reached
      if (errorBody.detail && errorBody.detail.includes("Maximum requests limit reached")) {
        throw new Error("Maximum requests limit reached");
      }

      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received from API");
    }

    return data;
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    throw error;
  }
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "losangeles";
  const minFollowers = Number(searchParams.get("minFollowers") || 0);

  // ✅ Replace with real scraping or API logic:
  try {
    const data = await fetchDynamicInstagramData(location);

    const filtered = data.filter((post: Post) => {
      const followersMatch = post.owner.followers >= minFollowers;
      return followersMatch;
    });

    return NextResponse.json(filtered);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Maximum requests limit reached")) {
      return NextResponse.json(
        { error: "API request limit reached. Please try again later." },
        { status: 429 }
      );
    }

    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

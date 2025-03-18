import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar"
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const { 
    data: movies, 
    loading: moviesLoading, 
    error: moviesError 
  } = useFetch(() => 
    fetchMovies({ 
      query: ''
    })
  );

  return (
    <View 
      className="flex-1 bg-primary"
    >
      <Image
        source={images.bg}
        className="absolute w-full z-0"
      />
      <ScrollView
        className="flex-1 px-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: '100%',
          paddingBottom: 10
        }}
      >
        <Image 
          source={images.truffleLogo}
          className="w-full mx-auto"
          resizeMode="contain"
        />
        {
          moviesLoading || trendingLoading ? (
            <ActivityIndicator 
              size="large"
              color="#0000ff"
              className="mt-10 self-center"
            />
          ) : moviesError || trendingError ? (
            <Text>Error: {moviesError?.message || trendingError?.message}</Text>
          ) : (
            <View
            className="flex-1 mt-5"
          >
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie or drink"
            />

            {trendingMovies && (
              <View
                className="mt-10"
              >
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard 
                      movie={item}
                      index={index}
                    />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4"/>}
                  className="mb-4 mt-3"
                />
              </View>
            )}
            
            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              <FlatList 
                data={movies}
                renderItem={({ item }) => (
                  <MovieCard
                    {...item}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'center',
                  gap: 20,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </>
          </View>
          )
        }
      </ScrollView>
    </View>
  );
}

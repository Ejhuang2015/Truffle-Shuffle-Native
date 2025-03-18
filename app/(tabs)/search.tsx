import {View, Text, Image, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const { 
      data: movies, 
      loading: moviesLoading, 
      error: moviesError ,
      refetch: loadMovies,
      reset,
    } = useFetch(() => 
      fetchMovies({ 
        query: searchQuery
      }), 
      false
    );

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if(searchQuery.trim()) {
                await loadMovies();
            } else {
                reset()
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery])

    useEffect(() => {
        if(movies?.length > 0 && movies?.[0]) {
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View
            className='flex-1 bg-primary'
        >
            <Image 
                source={images.bg}
                className='flex-1 absolute w-full z-0'
                resizeMode='cover'
            />
            <FlatList
                data={movies}
                renderItem={({ item }) => (
                    <MovieCard 
                        {...item} 
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                className='px-5'
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 20,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                ListHeaderComponent={
                    <>
                        <View
                            className='w-full flex-row justify-center mt-20 items-center'
                        >
                            <Image
                                source={images.truffleLogo}
                                className="w-full mx-auto"
                                resizeMode="contain"
                            />
                        </View>

                        <View
                            className='my-5'
                        >
                            <SearchBar
                                placeholder='Search movies...'
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                            />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className='my-3'
                            />
                        )}

                        {moviesError && (
                            <Text
                                className='text-red-500 px-5 my-3'
                            >
                                Error: {moviesError.message}
                            </Text>
                        )}

                        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                            <Text
                                className='text-xl text-white font-bold'
                            >
                                Search Results for{' '}
                                <Text
                                    className='text-secondary'
                                >
                                    {searchQuery}
                                </Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <View
                            className='mt-10 px-5'
                        >
                            <Text
                                className='text-center text-secondaryDark'
                            >
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}
export default Search

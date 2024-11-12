import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, FlatList, View, Pressable, Image, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Modal, ImageBackground, Animated } from 'react-native';
import MainContext from '@/helper/mainScreensContext';
import { Ionicons, Feather } from '@expo/vector-icons/';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomText from '@/components/customText';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useQuery, useInfiniteQuery, useQueryClient, useMutation, queryOptions } from '@tanstack/react-query';
import { fetchProfile } from '@/helper/fetchUserProfile';
import { fetchUserSpecificPosts } from '@/helper/challanges';
import PostItem from '@/components/postItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'
import { updateUser } from '@/helper/updateUser';
import { BlurView } from 'expo-blur';

const HEADER_HEIGHT_NARROWED = 90
const HEADER_HEIGHT_EXPANDED = 35

const AnimatedImageBackground = Animated.createAnimatedComponent(
  ImageBackground
)

const AnimatedBlurView = Animated.createAnimatedComponent(
  BlurView
)

export default function postPreview({ route }) {
  const queryClient = useQueryClient()
  const insets = useSafeAreaInsets()
  const urlParams = useLocalSearchParams()

  const [username, setUsername] = useState('')

  const [isDefaultPfp, setIsDefaultPfp] = useState(false)
  const [isDefaultBg, setIsDefaultBg] = useState(false)
  const [isHeaderMounted, setIsHeaderMounted] = useState(false);

  const [pfp, setPfp] = useState<string | null>(null)
  const [pfpBase64, setPfpBase64] = useState<string | null>(null)
  const [bgPic, setBgPic] = useState<string | null>(null)
  const [bgPicBase64, setBgPicBase64] = useState<string | null>(null)
  const [name, setName] = useState<string>('')

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }, [])
  )

  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    const getUsername = async () => {
      const foundUsername = await AsyncStorage.getItem("username")
      setUsername(foundUsername)
      setName(foundUsername)
    }
    getUsername()
  }, [])
  useEffect(() => {
  })

  const cancelEdit = () => {
    setModalVisible(false)
    setPfp(null)
    setPfpBase64(null)
    setBgPic(null)
    setBgPicBase64(null)
    setIsDefaultPfp(false)
    setIsDefaultBg(false)
    setName(username)
  }


  const queryProfile = useQuery({
    queryKey: ["profile"],
    queryFn: () => {
      return fetchProfile(urlParams?.user)
    }
  })


  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', urlParams?.user],
    queryFn: ({ pageParam }) => {
      return fetchUserSpecificPosts(pageParam)
    },
    initialPageParam: { lastId: '', username: urlParams?.user },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return { lastId: lastPage[lastPage?.length - 1]?._id, username: urlParams?.user }
    }
  })

  const postMutation = useMutation({
    mutationFn: updateUser,
    onSuccess(data, variables, context) {
      setModalVisible(false)
      queryClient.invalidateQueries({ queryKey: ['posts', username] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onSettled(data, error, variables, context) {
      console.log(error,)
    },
  })

  if (queryProfile.status == "success") {
    if (typeof queryProfile.data.UserRank == typeof 0) {
      queryProfile.data.UserRank = addTh(queryProfile.data.UserRank)
    }
  }
  const pickPfp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
      base64: true
    })

    if (!result.canceled) {
      setPfp(result.assets[0].uri)
      setPfpBase64(result.assets[0].base64)
      setIsDefaultPfp(true)
    }
  }

  const pickBg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
      base64: true
    })

    if (!result.canceled) {
      setBgPic(result.assets[0].uri)
      setBgPicBase64(result.assets[0].base64)
      setIsDefaultBg(true)
    }
  }

  function addTh(num) {
    switch (num) {
      case 1:
        return "1st"
        break
      case 2:
        return "2nd"
      case 3:
        return "3rd"
      default:
        return `${num}th`
    }
  }


  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 20,
  })
  const removeKeyboard = () => {
    Keyboard.dismiss()
  }

  const scrollY = useRef(new Animated.Value(0)).current

  return (
    <View className="items-center bg-[#060604] flex-[1] color-white">
      {/* Make this have an custom animation so the dim bg appears right away and the content slides */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableWithoutFeedback className='flex-[1]' onPress={removeKeyboard}>
          <View className='flex-[1] justify-end bg-[#000000B3] '>
            <View className='w-full h-[90%]  rounded-xl bg-[#060605]'>
              <View className='px-5 py-4 flex-row justify-between items-center'>
                <Pressable onPress={cancelEdit}>
                  <CustomText text="Cancel" type="Regular" className="text-17 text-white"></CustomText>
                </Pressable>
                <CustomText text="Edit Profile" type="SemiBold" className="text-17 text-white"></CustomText>
                <Pressable onPress={() => { postMutation.mutate({ pfpBase64, bgPicBase64, displayUsername: name }) }}>
                  <CustomText text="Save" type="Regular" className="text-17 text-white"></CustomText>
                </Pressable>
              </View>
              <View className='w-full h-[0.5] bg-zinc-800 '></View>

              <Pressable onPress={pickBg}>
                {queryProfile.data?.backgroundName == "Default" && isDefaultBg == false
                  ? (<View className='w-full h-32 bg-zinc-600'></View>)
                  : (<Image className='w-full h-32' source={bgPic != null ? { uri: bgPic } : { uri: queryProfile.data?.backgroundUrl }} />)
                }
              </Pressable>
              <View className='px-4'>
                <View className='h-28 w-full flex-row justify-between items-center rounded-full relative bottom-7 mb-3'>
                  <View className='w-[80] h-[80] justify-center rounded-full bg-[#080707] p-1'>
                    <Pressable onPress={pickPfp}>
                      {queryProfile.data?.pictureUrl == "" && isDefaultPfp == false
                        ? (<Image source={require('../../../../assets/pfp2.png')} className=" rounded-full w-full h-full"></Image>)
                        : (<Image source={pfp != null ? { uri: pfp } : { uri: queryProfile.data?.pictureUrl }} className='rounded-full w-full h-full'></Image>)
                      }
                    </Pressable>
                  </View>
                </View>
              </View>
              <View className=' relative bottom-7 '>
                <View className='w-full h-[0.5] bg-zinc-800 '></View>
                <View className='px-5 flex-row gap-4 items-center'>
                  <CustomText text="Name" type="Medium" className="text-15 text-white"></CustomText>
                  <TextInput
                    className="px-5 py-3 w-full text-15 text-[#D9F99D] rounded-lg "
                    style={{ fontFamily: 'Regular' }}
                    onChangeText={setName}
                    placeholder="Search"
                    placeholderTextColor="#ffffff"
                    value={name}
                  >
                  </TextInput>
                </View>
                <View className='w-full h-[0.5] bg-zinc-800 '></View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        style={{
          zIndex: 10,
          marginTop: insets.top - 4,
          elevation: 2
        }}
        hitSlop={{ top: insets.top - 4, bottom: insets.top - 4, right: 40, left: 40 }}
        className='absolute left-4 w-[38] h-[38] bg-[#13131080] justify-center rounded-full'
        onPress={() => { router.back() }}
      >
        <Ionicons className='mr-3' name="caret-back-outline" size={34} color="#E4FF66" />
      </TouchableOpacity>
      <Animated.View
        style={{
          zIndex: 10,
          position: "absolute",
          top: insets.top - 3,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: scrollY.interpolate({
            inputRange: [-20, 0],
            outputRange: [1, 0],
            extrapolate: "clamp"
          }),
          transform: [
            {
              rotate: scrollY.interpolate({
                inputRange: [-60, -35],
                outputRange: ['180deg', '0deg'],
                extrapolate: 'clamp'
              })
            }
          ]
        }}
      >
        <Feather name='arrow-down' size={30} color="#E4FF66" />
      </Animated.View>
      <Animated.View
        style={{
          zIndex: 2,
          position: "absolute",
          top: insets.top - 8,
          right: 0,
          left: 0,
          alignItems: "center",
          opacity: scrollY.interpolate({
            inputRange: [90, 120],
            outputRange: [0, 1],
            extrapolate: "clamp"
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [90, 120],
                outputRange: [30, 0],
                extrapolate: "clamp"
              })
            }
          ]
        }}
      >
        <CustomText text={queryProfile.data?.displayName} type="SemiBold" className=" relative top-1 text-18 color-[#E4FF66]" />
        <CustomText text={queryProfile.data?.doneChallenges.length + " challenges"} type="Regular" className="color-[#E4FF66]" />
      </Animated.View>
      {queryProfile.data?.backgroundName == "Default"
        ? (<Animated.View
          style={{
            height: HEADER_HEIGHT_NARROWED + HEADER_HEIGHT_EXPANDED,
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [-200, 0],
                  outputRange: [5, 1],
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp'
                })
              }
            ]
          }}
          className=' absolute w-full bg-zinc-600'
        ></Animated.View>)
        : (<AnimatedImageBackground
          style={{
            height: HEADER_HEIGHT_NARROWED + HEADER_HEIGHT_EXPANDED,
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [-200, 0],
                  outputRange: [5, 1],
                  extrapolateLeft: 'extend',
                  extrapolateRight: 'clamp'
                })
              }
            ]
          }}
          className='absolute w-full '
          source={{ uri: queryProfile?.data?.backgroundUrl }}
        >
          <AnimatedBlurView
            className='flex-[1]'
            experimentalBlurMethod='dimezisBlurView'
            tint='dark'
            intensity={94}
            style={{
              opacity: scrollY.interpolate({
                inputRange: [-50, 0, 50, 120],
                outputRange: [1, 0, 0, 1],
                extrapolate: "clamp"
              })
            }}
          ></AnimatedBlurView>
          {/*this can cause alot of performace issues on android ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/}
        </AnimatedImageBackground>)
      }
      <Animated.FlatList
        ListHeaderComponent={() => {
          return (
            <View
              className="w-full bg-[#060604]"
              onLayout={() => setIsHeaderMounted(true)}
            >
              <View className='flex-[1] px-4'>
                <Animated.View
                  style={{
                    transform: [{
                      translateY: scrollY.interpolate({
                        inputRange: [0, HEADER_HEIGHT_EXPANDED + 90],
                        outputRange: [0, 40],
                        extrapolate: "clamp"
                      })
                    }]
                  }}
                  className='h-28 w-full flex-row justify-between items-center rounded-full relative bottom-7 mb-3'
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          scale: scrollY.interpolate({
                            inputRange: [0, HEADER_HEIGHT_EXPANDED + 20],
                            outputRange: [1, 0.6],
                            extrapolate: "clamp"
                          })
                        },
                      ]
                    }}

                    className='w-[100] h-[100] justify-center rounded-full bg-[#080707] p-1'
                  >
                    <Image
                      source={
                        queryProfile?.data?.pictureUrl == ""
                          ? require('../../../../assets/pfp2.png')
                          : { uri: queryProfile.data?.pictureUrl }
                      }
                      className=" rounded-full w-full h-full"
                    ></Image>
                  </Animated.View>
                  <Animated.View
                    style={{
                      transform: [{
                        translateY: scrollY.interpolate({
                          inputRange: [0, HEADER_HEIGHT_EXPANDED + 40],
                          outputRange: [0, -12],
                          extrapolate: "clamp"
                        })
                      }]

                    }}
                  >
                    <Pressable style={urlParams?.user == username ? {} : { display: 'none' }} onPress={() => { setModalVisible(!modalVisible) }}>
                      <View className=' justify-center items-center rounded-xl px-6 py-1.5 border-2 mt-3 border-zinc-600'>
                        <CustomText className="tracking-tight text-14 color-[#696969]" type="SemiBold" text="Edit profile" ></CustomText>
                      </View>
                    </Pressable>
                  </Animated.View>
                  {/*TODO make this a component ^^^^^^*/}
                </Animated.View>
                <Animated.View
                  style={{
                    position: "relative",
                  }}
                  className='flex-[1] relative'
                >
                  <CustomText text={queryProfile.data?.displayName} type="ExtraBold" className="text-22 color-[#C2DC55]" />
                  <View className='flex-row gap-2 mt-1'>
                    <CustomText text={'@' + queryProfile.data?.username} type="Medium" className="text-15 color-[#D9F99D]" />
                    <CustomText text="." type="Black" className="relative bottom-2 text-20 color-[#D9F99D]" />
                    <CustomText text="Joined Sept 2024" type="Regular" className="text-15 color-[#D9F99D]" />
                  </View>
                  <View className='mt-5 flex-row justify-between'>
                    <View className='flex-col justify-between gap-2'>
                      <CustomText text={queryProfile.data?.dailyStreak} type="ExtraBold" className="color-gray-100 text-15" />
                      <View className='flew-row'>
                        <CustomText text="Day" type="Regular" className="color-gray-200 text-15" />
                        <CustomText text="Streak" type="Regular" className="color-gray-200 text-15" />
                      </View>
                    </View>
                    <View className='h-full w-0.5 rounded-full bg-zinc-700'></View>
                    <View className='flex-col justify-between gap-2'>
                      <CustomText text={queryProfile.data?.doneChallenges.length} type="ExtraBold" className="color-gray-100 text-15" />
                      <View className='flew-row'>
                        <CustomText text="Challanges" type="Regular" className="color-gray-200 text-15" />
                        <CustomText text="Completed" type="Regular" className="color-gray-200 text-15" />
                      </View>
                    </View>
                    <View className='h-full w-0.5 rounded-full bg-zinc-700'></View>
                    <View className='flex-col justify-between gap-2'>
                      <CustomText text={queryProfile.data?.UserRank} type="ExtraBold" className="color-gray-100 text-15" />
                      <View className='flew-row'>
                        <CustomText text="in" type="Regular" className="color-gray-200 text-15" />
                        <CustomText text="Bulgaria" type="Regular" className="color-gray-200 text-15" />
                      </View>
                    </View>
                  </View>
                  <View className='w-full h-[1] bg-zinc-700 mt-4'></View>
                </Animated.View>
              </View>
            </View >
          )
        }}
        className="w-full "
        style={{
          zIndex: 3,
          elevation: 3,
          marginTop: HEADER_HEIGHT_NARROWED,
          paddingTop: HEADER_HEIGHT_EXPANDED,
        }}
        key={isHeaderMounted ? 'mounted' : 'initial'}
        scrollEventThrottle={16}
        data={data?.pages.flat()}
        keyExtractor={item => {
          return item._id
        }}
        showsVerticalScrollIndicator={false}
        onScroll={
          Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
            {
              useNativeDriver: true
            })
        }
        onViewableItemChanged={({ viewableItems, changed }) => {
          const lastVisableItem = viewableItems[viewableItems.length - 1]

          if (lastVisableItem) {
            const { index } = lastVisableItem
            if (index >= data?.pages.flat().length - 3) {
              const lastPage = data?.pages[data?.pages.length - 1]
              if (lastPage == 0 && lastPage < data?.pages[data?.pages.length - 2]) {

              } else {
                fetchNextPage()
              }
            }
          }
        }}
        viewabilityConfig={viewabilityConfig.current}
        renderItem={(item) => {
          return (
            <PostItem
              pfpUrl={queryProfile?.data?.pictureUrl}
              attachmentUrl={item.item.attachmentUrl}
              username={queryProfile?.data?.username}
              challengeDesc={item.item.challengeDesc}
              description={item.item.text}
              datePosted={item.item.datePosted}
            >
            </PostItem>
          )
        }}
      />
    </View >
  );
}


import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const customerToken = localStorage.getItem('userToken')

function verifyToken(keyName) {
    const storage = localStorage.getItem(keyName);
    if(storage) {
       const decodeToken = jwtDecode(storage);
       const expiresIn = new Date(decodeToken.exp * 1000);
       if(new Date() > expiresIn) {
           localStorage.removeItem(keyName);
           return null;
       } else {
           return storage;
       }
    } else {
        return null;
    }
}
const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
      contactusid: '660745e71ab800d6bfb19408',
      donateuserid: '667dab73593f12c567b0f477',
        adminToken: verifyToken('admin-token'),
        userToken: verifyToken('userToken'),
        // user: customerToken ? jwtDecode(customerToken) : null,
        mode: "light",
        location: null,
        latlong: null,
        user: null,
        token: null,
        demoshowhome: null,
        posts: [],
        step: 0,          // Add step to the state
        campaignId: null, // Add campaignId to the state
    },
    reducers: {
        setAdminToken: (state, action) => {
          state.adminToken = action.payload;
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
            // state.user = jwtDecode(action.payload);
        },
        logout: (state, {payload}) => {
          localStorage.removeItem(payload)
          if(payload === 'admin-token') {
            state.adminToken = null;
          } else if(payload === 'userToken') {
            state.userToken = null;
            state.token = null;
            state.user = null;
          }
        },
        setMode: (state) => {
          state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
          console.log(action.payload)
          state.user = action.payload.user;
          state.token = action.payload.token;
        },
        setDemoShow: (state, action) => {
          
          state.demoshowhome = action.payload;
          
        },
        setLogout: (state) => {
          state.user = null;
          state.token = null;
        },
        setlocation: (state, action) => {
          console.warn(action.payload)
          state.latlong = action.payload.latlong;
        },
        setdisplaylocation: (state, action) => {
          
          state.location = action.payload.location;
        },
        setUserPicturePath: (state, action) => {
          // Find the user by _id and update its picturePath
          state.user.picturePath = action.payload.picturePath;
        },
        setFriends: (state, action) => {
          if (state.user) {
            state.user.friends = action.payload.friends;
          } else {
            console.error("user friends non-existent :(");
          }
        },
        setPets: (state, action) => {
          if (state.user) {
            state.user.pets = action.payload.pets;
          } else {
            console.error("user pets non-existent :(");
          }
        },
        setPosts: (state, action) => {
          state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
          const updatedPosts = state.posts.map((post) => {
            if (post._id === action.payload.post._id) return action.payload.post;
            return post;
          });
          state.posts = updatedPosts;
        },
        setPetsType: (state, action) => {
          state.petstype = action.payload.petstype;
        },
        setStepAndCampaignId: (state, action) => {
          state.step = action.payload.step;
          state.campaignId = action.payload.campaignId;
      },
      resetStepAndCampaignId: (state) => {
          state.step = 1;
          state.campaignId = null;
      },
    }
})
export const {setAdminToken, setUserToken, logout,setMode,setDemoShow, setLogin, setLogout,setlocation,setdisplaylocation, setFriends,setPets, setPosts, setPost,setPetsType,setUserPicturePath,setStepAndCampaignId,
  resetStepAndCampaignId,} = authReducer.actions;
export default authReducer.reducer;
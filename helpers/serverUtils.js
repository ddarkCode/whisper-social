import debug from "debug";

import User from "../models/authModel";
import Like from "../models/likeModel";

const log = debug('app:serverUtils');

export async function whisperWithInfo(foundWhisper, req) {
 
    const whisperer = await User.findById(foundWhisper.whispererId);
    let whisperStatus = false;
    let likeStatus;
    if (req.user !== undefined) {
      likeStatus = await Like.findOne({likedById: req.user._id, whisperId: foundWhisper._id})
    }

    const {title, image_url, whispererId, whisper, createdAt} = foundWhisper;
    const {username, firstname, lastname} = whisperer;

    if (req.user !== undefined) {
      if (req.user._id === whispererId)
      whisperStatus = true
    }
    
  
    const WhisperWithWhispererInfoAndLinks = Object.assign({},
      {title, likeStatus, whisperStatus,
      image_url, whispererId, whisper, createdAt,username, firstname, lastname}, 
      {links: {filteredBy: `${req.headers.host}/api/whispers/?whispererId=${foundWhisper.whispererId}`} });

      return WhisperWithWhispererInfoAndLinks
  
}

export const getFollowInfo = (resolved) => {
  const followObj = {}
  resolved.forEach(resolvedKey => {
    Object.keys(resolvedKey).forEach(key => {
      if (Object.keys(resolvedKey[key]).length > 5) {
        let follower = {}
        for (let prop in resolvedKey[key]) {
          if (prop !== 'password' && prop !== 'email' && prop  !== 'updatedAt') {
            follower[prop] = resolvedKey[key][prop]
          }
        }
        followObj[follower._id] = follower
      } 
    })
   })
   return followObj;
}

export const followPromise = async (arr, model) => {
  return arr.map( async id => {
    const followersInfo = await model.findById(id);
    return followersInfo
  });
}
import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import { Link, useParams } from "react-router-dom"
import { CheckCircle } from "@mui/icons-material"

import { fetchFromAPI } from "../utils/FetchFromAPI"
import { Videos } from "./"

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
     .then( resData => setVideoDetail(resData.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideoid=${id}&type=video`)
     .then( resData => setRelatedVideos(resData.items))
  },[id]);

  if(!videoDetail) return 'Loading.....';

  const { snippet: { title, description, channelId, channelTitle }, statistics: {commentCount, likeCount, viewCount} } = videoDetail;
  
  console.log(relatedVideos);

  return (
    <Box minHeight='95vh'>
      <Stack direction={{ sx:'column', md:'row'}}>
        <Box flex={1}>
          <Box sx={{width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
            <Typography variant="h5" color='#fff' fontWeight='bold' p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{color:"#fff"}} py={1} px={2} >
              <Link to={`channel/${channelId}`}>
                <Typography variant={{sm:'subtitle1', md:'h6'}} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:'12px', color:'gray', ml:'5px' }} />
                </Typography>
              </Link>
              <Stack direction="row" gap='20px' alignItems="center">
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{opacity:0.7}}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{md: 1 ,sx: 5}} justifyContent="center" alignItems="center">
          <Videos videos={relatedVideos} direction="column" />
        </Box>
      </Stack>
    </Box>
  )
}

export default VideoDetail
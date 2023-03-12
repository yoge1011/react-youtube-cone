import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Box } from "@mui/material"

import {Navbar, SearchFeed, ChannelDetail, VideoDetail, Feed} from "./components"

const App = () => (
    <BrowserRouter>
      <Box sx={{background:"#000"}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
)

export default App
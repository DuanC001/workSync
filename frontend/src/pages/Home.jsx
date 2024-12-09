import React from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-scroll';
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { PrimaryButton , SecondaryButton,LandingPrimaryButton,LandingSecondaryButton,FloatingButton} from "../theme/buttons";

export default function Home() {
  const customerLogos = [
    { src: "path-to-logo1.png", alt: "Logo 1" },
    { src: "path-to-logo2.png", alt: "Logo 2" },
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // console.log('Is mobile:', isMobile);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Worksynk | Home</title>
        <meta name="description" content="Worksynk Home Page" />
      </Helmet>
      <Box className= "heroImageBigger" sx={{height:"100vh"}}>
        <Box  style={{background:" linear-gradient(158deg, #FF996E -10.4%, #FF524D 111.55%)"}}>
          <Header />
          <Box
            className="homeContainer"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              textAlign: "center",
              gap: "1rem",
              // marginTop: isMobile ? "8rem" : "1rem"
            }}
          >
            <Box textAlign="center" sx={{ flex: 1, maxWidth:isMobile?"none" :"50%", padding:"1rem" , marginTop:"2rem"}}>
              <Typography
                variant={isMobile ? "h1Small" : "h1Large"}
                sx={{ textAlign:"center", color:"white" }}
              >
                Simplify HR management for your small business with Worksynk
              </Typography>
              <Typography
                variant={isMobile ? "subtitle2" : "subtitle1"}
                sx={{ textAlign:"center" , color:"white", display:isMobile?"none":"block", margin:"1rem 0"}}
              >
                Streamlining operations and elevating standards with Worksynk
              </Typography>
              <Box sx={{ textAlign:"center",justifyContent:"center", display:"flex", flexDirection:isMobile?"column":"row", gap:"1rem", margin:"auto", width:"70%", marginTop:"2rem", marginBottom:"11rem", zIndex:isMobile?"1":"100", position:"relative"}}>
                
                <LandingPrimaryButton sx={{ marginRight: theme.spacing(1), '&:hover':{cursor:"pointer"} }}>
                  <Link to="/sign-up" style={{color:"white"}}>SIGN UP</Link>
                </LandingPrimaryButton>
                {/* <LandingSecondaryButton>
                  VIEW DEMO
                </LandingSecondaryButton> */}
                <LandingSecondaryButton>
                  <a href="https://youtu.be/YmoTD7MyzvY" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>VIEW DEMO</a>
                </LandingSecondaryButton>
              
              </Box>
              <Box className="heroImage">
                <img src="../../images/Landing page/Hero Image.png" alt="hero image" />
              </Box>
              <Box className="heroImage2">
                <img src="../../images/Landing page/Hero Image.png" alt="hero image" />
              </Box>
        
              </Box>
        
            </Box>
        </Box>
      </Box>

      <Box sx={{textAlign:"left"}}>
        
        <Box id="feature" sx={{margin:isMobile?"none":"auto", width:isMobile?"100%":"90%"}}>
          <Box sx={{textAlign:"center", display:"flex", flexDirection:"column", gap:".1rem", marginTop:"5rem"}}>
            <Typography variant={isMobile?"body2":"body1"} sx={{textTransform:"uppercase", color:theme.palette.primary.main}} >Key Features</Typography>
            <Typography variant={isMobile?"h2Small":"h2Large"}>Discover Worksynk's essential features for success</Typography>
          </Box>
          <Box  className="imageRight" sx={{display:"flex", flexDirection:isMobile?"column":"row", gap:"1rem", margin:"5rem 0", justifyContent:isMobile?"unset":"center", alignItems:isMobile?"none":"center"}}>
            <Box className="imagelandingfour" sx={{flex:isMobile?"":"1 0 60%"}}>
              <img src="../../images/Landing page/1.png" alt="onboarding" />
            </Box>
            <Box sx={{padding:"1rem"}}>
              <Typography variant={isMobile?"h3Small":"h3Large"}>Efficient Onboarding</Typography>
              <Typography fontSize="20px">Worksynk streamlines cleaner onboarding with digital forms, secure document uploads, and customizable task checklists. Effortlessly transition new hires, reduce paperwork, and ensure compliance with our intuitive platform.</Typography>
            </Box>
          
          </Box>
          <Box sx={{display:"flex", flexDirection:isMobile?"column":"row", gap:"1rem", margin:"5rem 0", justifyContent:isMobile?"unset":"center", alignItems:isMobile?"none":"center"}}>
            <Box className="imagelandingfour" sx={{flex:isMobile?"":"1 0 60%"}}>
              <img src="../../images/Landing page/2.png" alt="offboarding" />
            </Box>
            <Box sx={{padding:"1rem"}}>
              <Typography variant={isMobile?"h3Small":"h3Large"}>Seamless Off-boarding</Typography>
              <Typography fontSize="20px">Efficiently manage the off-boarding process with Worksynk's seamless digital documentation feature. Say goodbye to paperwork hassles and streamline the exit process for your employees. Simplify your workflow and ensure a smooth transition with our intuitive platform</Typography>
            </Box>
          
          </Box>
          <Box className="imageRight" sx={{display:"flex", flexDirection:isMobile?"column":"row", gap:"1rem", margin:"5rem 0", justifyContent:isMobile?"unset":"center", alignItems:isMobile?"none":"center"}}>
            <Box className="imagelandingfour" sx={{flex:isMobile?"":"1 0 60%"}}>
              <img src="../../images/Landing page/3.png" alt="directory" />
            </Box>
            <Box sx={{padding:"1rem"}}>
              <Typography variant={isMobile?"h3Small":"h3Large"}>Team Directory</Typography>
              <Typography fontSize="20px">Introducing Worksynk's Team Directory feature: streamline your team's profiles and contact info in a centralized hub. Easily manage and update crucial details with efficiency. Plus, securely store and access important documents for seamless collaboration. Experience the power of organized teamwork today!</Typography>
            </Box>
          
          </Box>
          <Box sx={{display:"flex", flexDirection:isMobile?"column":"row", gap:"1rem", margin:"5rem 0", justifyContent:isMobile?"unset":"center", alignItems:isMobile?"none":"center"}}>
              <Box className="imagelandingfour" sx={{flex:isMobile?"":"1 0 60%"}}>
                  <img src="../../images/Landing page/4.png" alt="analytics" />
              </Box>
              <Box sx={{padding:"1rem"}}>
                <Typography variant={isMobile?"h3Small":"h3Large"}>Data analytics</Typography>
                <Typography fontSize="20px">Visualize onboarding and offboarding data with WorkSynk's intuitive graphs. Gain actionable insights for informed decision-making. Optimize HR processes and drive business growth effortlessly.</Typography>
              </Box>
          </Box>
        </Box>


{/* map section ==================================== */}
        <Box className="imageRight mapBox" sx={{position:"relative", textAlign:"center", margin:"5rem 0"}}>
          <Box className="mapImage" >
            <img src="../../images/Landing page/Map.png" alt="map"/>
          </Box>
          <Box sx={{padding:"1rem", position:"absolute", top:"50%", left:"50%",  transform: "translate(-50%, -50%)" }}>
            <Typography  className="mapBoxtypo1" variant={isMobile?"body2":"body1"} color="primary.main">OUR MISSION</Typography>
            <Typography className="mapBoxtypo2" variant={isMobile?"h5Small":"h5Large"} sx={{color:"white"}}>Empower businesses with innovative solutions to streamline operations and enhance productivity.</Typography>
          </Box>
        </Box>

{/* laptop lady ================================ */}
        <Box  id="about" sx={{margin:"2rem 1rem", display:isMobile?"":"flex",gap:isMobile?"":"1rem", flexDirection:isMobile?"none":"row-reverse", justifyContent:"center", alignItems:"center", width:isMobile?"100%":"90%", margin:isMobile?"":"auto", padding:isMobile?"1rem":""}}>
          <Box className="imagelandingfour" sx={{marginTop:isMobile?"":"5rem", marginBottom:"1rem",flex:isMobile?"":"1 0 60%",gap:"1rem"}}>
            <img src="../../images/Landing page/Company Worksynk fold.png" alt="hero image" />
          </Box>
          <Box sx={{display:"flex", flexDirection:"column", gap:"1rem"}}>
            <Typography variant={isMobile?"body2":"body1"} sx={{textTransform:"uppercase", color:theme.palette.primary.main}} >ABOUT US</Typography>
            <Typography variant={isMobile?"h2Small":"h2Large"}>Company Worksynk</Typography>
            <Typography>Worksynk is a digital tool designed for small companies with high turnover rates. It enhances efficiency and staff satisfaction by streamlining operations with user-friendly technology. 

Say goodbye to paperwork as Worksynk transforms departments into digital hubs, ensuring smooth management and boosting productivity.</Typography>
          </Box>
        </Box>


{/* team section section =================================== */}
        <Box id="contact" sx={{textAlign:"center", margin:"5rem 0"}}>
          <Box className="imagelandingfour">
            <Typography variant={isMobile?"body2":"body1"} sx={{textTransform:"uppercase", color:theme.palette.primary.main}} >BEHIND WORKSYNK</Typography>
            <Typography variant={isMobile?"h2Small":"h2Large"}>Our Team</Typography>
          </Box>
          <Box>

            
              <Box sx={{textAlign:"center", display:"flex", flexDirection:isMobile?"column" : "row", gap:"2rem", padding:isMobile?"5rem":"4rem", flexWrap:"wrap"}}>
                
                {/* team members ====================*/}
                <Box sx={{flex:"1 0 20%"}}>
                  <Box className="teamImages">
                  <a href="https://linkedin.com/in/herrerahenry" target="_blank"> 
                    <img src="../../images/Landing page/Team Pictures/Henry Herrera.png" alt="Henry Herrera" />
                  </a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Henry Herrera</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>Full-Stack Developer Lead</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>
                
                <Box sx={{flex:"1 0 20%"}}>
                  <Box className="teamImages">
                    <a href="https://www.linkedin.com/in/nikhil-kanda-21006678/" target="_blank"><img src="../../images/Landing page/Team Pictures/Nikhil Kanda.png" alt="Nikhil Kanda" /></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Nikhil Kanda</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>Full-Stack Design Lead</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

                <Box sx={{flex:"1 0 20%"}}>
                  <Box className="teamImages">
                    <a href="https://linkedin.com/in/simrandeepkaurd/" target="_blank"><img src="../../images/Landing page/Team Pictures/Simrandeep Kaur.png" alt="Simrandeep Kaur" /></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Simrandeep Kaur</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>Frontend Developer PM</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

                <Box sx={{flex:"1 0 20%"}}>
                  <Box className="teamImages">
                    <a href="https://www.linkedin.com/in/charles-duan-a20051281/" target="_blank"><img src="../../images/Landing page/Team Pictures/Chang Duan.png" alt="Chang Duan" /></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Chang Duan</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>Full-Stack Developer</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

                <Box sx={{flex:"0 25%", marginLeft:"auto"}}>
                  <Box className="teamImages">
                    <a href="https://www.linkedin.com/in/palak-goyal-/" target="_blank"><img src="../../images/Landing page/Team Pictures/┬áPalak Goyal.png" alt="Palak Goyal"/></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Palak Goyal</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>UX/UI Designer</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

                <Box sx={{flex:"0 25%"}}>
                  <Box className="teamImages">
                    <a href="https://www.linkedin.com/in/tobi-odulana-0923bb166/" target="_blank"><img src="../../images/Landing page/Team Pictures/Oluwatobiloba Odulana.png" alt="Oluwatobiloba Odulana" /></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Oluwatobiloba Odulana</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>Frontend Developer</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

                <Box sx={{flex:"0 25%", marginRight:"auto"}}>
                  <Box className="teamImages">
                    <a href="https://www.linkedin.com/in/rushik-patel-bbb8731b5/" target="_blank"><img src="../../images/Landing page/Team Pictures/Rushik Patel.png" alt="Rushik Patel" /></a>
                  </Box>
                  <Typography variant={isMobile?"h5Small":"h5Large"} sx={{color:theme.palette.primary.main}}>Rushik Patel</Typography>
                  <Typography variant={isMobile?"subtitle2":"subtitle1"} sx={{fontStyle:"italic"}}>UX/UI Designer</Typography>
                  <Box>
                    <img src="../../images/Landing page/LinkedIn.png" alt="LinkedIn logo" />
                  </Box>
                </Box>

              </Box>


          </Box>
        </Box>



      </Box>

{/* Pricing section ================================== */}

      <Box id="pricing" sx={{background:"rgba(0, 0, 0, 0.05)", padding:"1rem"}}>
            <Box sx={{textAlign:"center", marginBottom:isMobile?"":"6rem"}}>
                <Typography variant={isMobile?"body2":"body1"} sx={{textTransform:"uppercase", color:theme.palette.primary.main}} >PRICING</Typography>
                <Typography variant={isMobile?"h2Small":"h2Large"}>Flexible pricing options tailored to your needs</Typography>
            </Box>

            {/* cards for plans */}
            <Box sx={{display:isMobile?"":"flex", flexDirection:isMobile?"column":"row", justifyContent:"center", alignItems:"center", gap:"1rem", padding:"1rem", width:isMobile?"100%":"90%", margin:isMobile?"":"auto", marginBottom:isMobile?"":"6rem"  }}>
              <Card sx={{display:"flex",flexDirection:isMobile?"column":"row", margin:isMobile?"2.3rem":"",borderRadius: "16px", marginRight:isMobile?"":"2rem"}}>
                <CardContent>
                  <Typography variant={isMobile?"h1Small":"h1Large"}>$109<span style={{color:theme.palette.grey[200], fontSize:isMobile?"17px":"20px"}}>/month</span></Typography>
                  <Box sx={{margin:"1rem 0"}}>
                    <Typography variant={isMobile?"h2Small":"h2Large"} >Starter</Typography>
                    <Typography sx={{color:theme.palette.grey[200], fontSize:isMobile?"body2":"body1", fontStyle:"italic"}}>For the first 10 Users $5/month for each additional user</Typography>
                  </Box>
                  <Box sx={{marginBottom:"2rem"}}>
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0", fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    1 Admin Control
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Employee Onboard
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Team Directory
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Employee Off-board
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Document Storage
                    </Typography>
                    
                  </Box>
                  <SecondaryButton sx={{width:"100%"}}>CHOOSE STARTER</SecondaryButton>
                </CardContent>
              </Card>
              <Card sx={{display:"flex",flexDirection:isMobile?"column":"row", margin:isMobile?"2rem":"",borderRadius: "16px",background: "#FA6432", color:"white",
      
                objectFit:isMobile?"contained" :  'cover',
                transform:isMobile?"unset": 'scale(1.3)',
                transition: "all 0.3s ease-in-out",
                zIndex:isMobile?"unset": 1,
            }}>
                <CardContent>
                  <Typography variant={isMobile?"h1Small":"h1Large"}>$149<span style={{ fontSize:isMobile?"17px":"20px"}}>/month</span></Typography>
                  <Box sx={{margin:"1rem 0"}}>
                    <Typography variant={isMobile?"h2Small":"h2Large"} >Pro</Typography>
                    <Typography sx={{fontSize:isMobile?"body2":"body1", fontStyle:"italic"}}>For the first 30 Users $5/month for each additional user</Typography>
                  </Box>
                  <Box sx={{marginBottom:"2rem"}}>
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0", fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    3 Admin Control
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    Employee Onboard
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    Team Directory
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    Employee Off-board
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    Document Storage
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-2.png" alt="check orange" />
                    Customer Support
                    </Typography>
                    
                  </Box>
                  <FloatingButton sx={{width:"100%", borderRadius:"4px !important"}}>CHOOSE STARTER</FloatingButton>
                </CardContent>
              </Card>
              <Card sx={{display:"flex",flexDirection:isMobile?"column":"row", margin:isMobile?"2.3rem":"",borderRadius: "16px",marginLeft:isMobile?"":"2rem"}}>
                <CardContent>
                  <Typography variant={isMobile?"h1Small":"h1Large"}>$199<span style={{color:theme.palette.grey[200], fontSize:isMobile?"17px":"20px"}}>/month</span></Typography>
                  <Box sx={{margin:"1rem 0"}}>
                    <Typography variant={isMobile?"h2Small":"h2Large"} >Enterprise</Typography>
                    <Typography sx={{color:theme.palette.grey[200], fontSize:isMobile?"body2":"body1", fontStyle:"italic"}}>For the first 75 Users $5/month for each additional user</Typography>
                  </Box>
                  <Box sx={{marginBottom:"2rem"}}>
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0", fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    9 Admin Control
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Employee Onboard
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Team Directory
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Employee Off-board
                    </Typography>
                                        
                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    Document Storage
                    </Typography>

                    <Typography sx={{display:"flex", alignItem:"center", gap:".5rem",margin:".5rem 0",fontSize:isMobile?"body2":"body1"}}>
                    <img src="../../images/Landing page/check-circle-1.png" alt="check orange" />
                    24x7 Customer Support
                    </Typography>
                    
                  </Box>
                  <SecondaryButton sx={{width:"100%"}}>CONTACT SALES</SecondaryButton>
                </CardContent>
              </Card>

            </Box>
      </Box>



      <Box sx={{textAlign:"center" , width:isMobile?"unset":"90%", margin:isMobile?"5rem 1rem":"5rem auto 0 auto" }}>
              <Typography variant={isMobile?"h2Small":"h2Large"}>
              Boost Your Business with Worksynk!
              </Typography>
              <Box>
                <PrimaryButton sx={{width:isMobile?"50%":"30%", margin:"1rem 0", marginBottom:isMobile?"":"5rem"}} component={Link}
                  to="/sign-up">
                  SIGN UP TODAY
                </PrimaryButton>
              </Box>
      </Box>
      
      
      <Footer />
    </>
  );
}

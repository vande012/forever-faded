import Image from "next/image"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export default function PodcastPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Welcome Section - Now at the top */}
      <section className="py-16 lg:mt-40 mt-20 bg-zinc-900">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-4 items-center">
                <div className="relative w-[300px] h-[300px] mx-auto md:mx-0 rounded-lg overflow-hidden">
                  <Image
                    src="/podcast.webp"
                    alt="Vintage barbershop"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-6 gold-gradient-text">
                    Welcome to the Success After Barber School PODCAST
                  </h1>
                  <p className="text-gray-300 mb-4">
                    Join us as we explore the real and essential advice on how to build a legacy within the barbering
                    industry and beyond.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Each episode will feature a successful barber that will share their journey and insights on how to
                    succeed in today&apos;s market.
                  </p>
                  <p className="text-gray-300">
                    Subscribe on your favorite platform now to get notified when new episodes drop and connect with other barbers who are committed to
                    excellence.
                  </p>
                </div>
              </div>
            </div>
          </section>

      {/* Hero Section with YouTube video - Now second */}
      <div className="relative h-[600px] w-full overflow-hidden hidden md:block">
        <div className="absolute inset-0 w-full h-full">
          {/* YouTube video - fullscreen */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe 
              id="ytplayer" 
              src="https://www.youtube-nocookie.com/embed/uK7xGVckVME?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=uK7xGVckVME&playsinline=1&start=0&end=27&version=3&modestbranding=1&fs=0&disablekb=1&iv_load_policy=3" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              title="YouTube video player"
              loading="lazy"
              style={{ 
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                width: '140%',
                height: '140%',
                border: 'none',
                pointerEvents: 'none'
              }}
            ></iframe>
          </div>
          
          <div className="absolute inset-0 bg-black bg-opacity-60 z-[1]"></div>
        </div>
      </div>

      {/* Latest Episodes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center gold-gradient-text">Latest Episodes</h2>

          {/* Spotify Embed */}
          <div className="mb-16">
            <iframe
              style={{ borderRadius: "12px" }}
              src="https://open.spotify.com/embed/show/2jdaRC7NB6rqDebVpGn8JD?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full max-w-4xl mx-auto"
            />
          </div>

          {/* Apple Podcasts Embed */}
          <div className="mb-16">
            <iframe 
              src="https://embed.podcasts.apple.com/us/podcast/success-after-barber-school/id1652171092"
              height="450"
              frameBorder="0"
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
              className="w-full max-w-[660px] mx-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Available Platforms */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 gold-gradient-text">Listen On Your Favorite Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <Link 
              href="https://open.spotify.com/show/2jdaRC7NB6rqDebVpGn8JD" 
              target="_blank" 
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/spotify-logo.svg"
                alt="Spotify"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://podcasts.apple.com/us/podcast/success-after-barber-school/id1652171092" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/apple-podcast-logo.jpg"
                alt="Apple Podcasts"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://music.amazon.in/podcasts/4827ea2a-9689-4fe5-822b-2f88225d6522" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/amazon.webp"
                alt="Amazon Music"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://www.deezer.com/en/show/5317657" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/deezer.png"
                alt="Deezer"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://podcastindex.org/podcast/5779029" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/podcastindex.jpg"
                alt="Podcast Index"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://player.fm/series/series-3410186" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/playerfm.png"
                alt="Player.FM"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://tunein.com/podcasts/Entrepreneurship/Success-After-Barber-School-p2505997/?topicId=216151020" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/tuneinlogo.webp"
                alt="Tune In"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
            <Link 
              href="https://www.jiosaavn.com/shows/success-after-barber-school/1/LPjlPzIJdpY_" 
              target="_blank"
              className="bg-black p-6 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Image
                src="/jiosaavn.png"
                alt="Jiosaavn"
                width={120}
                height={40}
                className="w-full h-auto"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Book Promotion */}
      <section className="py-16">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
      <div>
        <h2 className="text-5xl font-bold mb-7 gold-gradient-text">The Change</h2>
        <p className="text-2xl mb-4 text-[#D4AF37]">Insights Into Self Empowerment</p>
        <p className="text-gray-300 text-2xl mb-6">
        &quot;Change is inevitable. Growth is optional.&quot; John C. Maxwell &quot;You will have to Grow Through what you Go Through.&quot; This statement is just as true today, as the first day I heard it…
        </p>
        <Link href="/thechange.pdf" target="_blank" rel="noopener noreferrer">
          <Button className="gold-gradient-bg">Download Free PDF</Button>
        </Link>
      </div>
            <div className="relative h-[500px]">
              <Image
                src="/Book.jpg?height=400&width=300"
                alt="The Change Book Cover"
                width={300}
                height={400}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

     {/* Contact Section */}
     <section className="bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 mt-8 text-center gold-gradient-text">
              Would You Like To Be A Guest On Our Podcast?
            </h2>
            <form className="grid gap-6 mb-16">
              <div className="grid md:grid-cols-2 gap-6">
                <Input placeholder="Name" className="bg-black border-[#D4AF37]" />
                <Input placeholder="Email" type="email" className="bg-black border-[#D4AF37]" />
              </div>
              <Textarea
                placeholder="Tell us about yourself and what you'd like to discuss..."
                className="bg-black border-[#D4AF37] h-32"
              />
              <Button className="gold-gradient-bg w-full md:w-auto md:px-12 justify-self-center">Submit Request</Button>
            </form>

            {/* Connect with Mr. T.I.M. section with image on right */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side: Text and social icons */}
              <div className="text-left">
                <h3 className="text-4xl font-bold mb-3 gold-gradient-text">Connect With Mr. T.I.M.</h3>
                <p className="text-gray-300 mb-6">
                  Educator, Master Barber, and Owner of Forever Faded Barbershop, Waukesha, WI
                </p>
                <div className="flex gap-8 mb-6">
                  <Link href="https://www.facebook.com/foreverFadedwi" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#C4A027] transition-colors">
                    <Facebook className="w-10 h-10" />
                  </Link>
                  <Link href="https://www.linkedin.com/in/tretic/" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#C4A027] transition-colors">
                    <Linkedin className="w-10 h-10" />
                  </Link>
                  <Link href="https://www.youtube.com/user/tretic13" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#C4A027] transition-colors">
                    <Youtube className="w-10 h-10" />
                  </Link>
                </div>
              </div>
              
              {/* Right side: Larger image */}
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src="/TIM.png"
                  alt="Mr. T.I.M."
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
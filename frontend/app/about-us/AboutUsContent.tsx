'use client'

import Image from "next/image"
import Link from "next/link"
import MapAndContact from "../components/MapSection"

type AboutUsContentProps = {
    hours: {
        hours: any[]
    }
}

export default function AboutUsContent({ hours }: AboutUsContentProps) {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[500px] mt-40 w-full overflow-hidden">
                <Image
                    src="/Storefront.jpg"
                    alt="Barber shop interior"
                    width={1920}
                    height={1080}
                    priority
                    quality={100}
                    className="object-cover w-full h-full brightness-75"
                    sizes="100vw"
                />
                
                {/* Black overlay on right side */}
                <div className="absolute top-0 right-0 w-2/5 h-full bg-black bg-opacity-90 hidden md:block"></div>
                
                {/* Content container with positioning */}
                <div className="absolute inset-0 flex flex-col items-center md:items-end justify-center px-4 md:px-16">
                    <div className="text-center md:text-right max-w-xl">
                        <h1 className="text-4xl md:text-7xl font-bold mb-4 text-center gold-gradient-text">Our Story</h1>
                        <p className="text-2xl text-center">Discover the passion and expertise behind Forever Faded Barbershop</p>
                    </div>
                </div>
            </div>

            {/* Our History Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6 gold-gradient-text">Our History</h2>
                        <p className="mb-4">
                            Founded in 2006, Forever Faded began as a small, one-chair barbershop with a big vision. Our founder,
                            James Mitchell, had a passion for precision cuts and creating a community space where people could feel
                            confident and comfortable.
                        </p>
                        <p className="mb-4">
                            {`Over the years, we've grown into Waukesha's premier barbershop, known for our exceptional service,
                            attention to detail, and welcoming atmosphere. What started as one barber's dream has evolved into a team
                            of skilled professionals dedicated to the craft of barbering.`}
                        </p>
                        <p>
                            Today, Forever Faded continues to set the standard for quality haircuts and grooming services in Waukesha,
                            while maintaining the personal touch and community focus that has been our foundation since day one.
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden">
                        <Image
                            src="/history.jpg"
                            alt="Forever Faded history"
                            width={800}
                            height={600}
                            quality={100}
                            className="object-cover w-full h-full"
                            sizes="(min-width: 768px) 50vw, 100vw"
                        />
                    </div>
                </div>
            </div>

             {/* Our Values Section */}
             <div className="bg-zinc-900 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center gold-gradient-text">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-800 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-black"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Quality</h3>
                            <p>
                                We never compromise on the quality of our service. Every haircut, every shave, and every style is
                                executed with precision and care.
                            </p>
                        </div>
                        <div className="bg-zinc-800 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-black"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Community</h3>
                            <p>
                                {`We believe in creating a welcoming space where everyone feels valued. Our barbershop is more than a
                                place for haircuts—it is a community hub.`}
                            </p>
                        </div>
                        <div className="bg-zinc-800 p-6 rounded-lg text-center">
                            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-black"
                                >
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Craftsmanship</h3>
                            <p>
                                We honor the tradition of barbering while embracing modern techniques. Our barbers are constantly honing
                                their skills to provide the best service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet the Founder Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold mb-6 gold-gradient-text">Meet the Founder</h2>
                        <p className="mb-4">
                            Tim started his journey in barbering over 17 years ago. After training under some of the best
                            barbers in the Midwest, he decided to bring his skills and vision back to his hometown of Waukesha.
                        </p>
                        <p className="mb-4">
                            {`"I wanted to create a place where people could not only get an exceptional haircut but also feel like they
                            belong to something special," says James. "At Forever Faded, we are not just cutting hair—we are building
                            confidence and community."`}
                        </p>
                        <p>
                            {`James's dedication to quality and customer service has been the driving force behind Forever Faded's
                            success and reputation as Waukesha's premier barbershop.`}
                        </p>
                    </div>
                    <div className="relative h-[400px] rounded-lg overflow-hidden order-1 md:order-2">
                        <Image
                            src="/theowner.jpg"
                            alt="Tim, Founder"
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>

            {/* Our Commitment Section */}
            <div className="bg-zinc-900 py-16">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6 gold-gradient-text">Our Commitment to You</h2>
                    <p className="text-lg mb-8">
                        {`At Forever Faded, we promise to provide you with more than just a haircut. We are committed to delivering an
                        experience that makes you look good, feel good, and want to come back.`}
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="https://getsquire.com/booking/book/forever-faded-llc-waukesha">
                            <button className="gold-gradient-bg text-black font-bold py-3 px-6 rounded button-enhance">
                                Book Now
                            </button>
                        </Link>
                        <Link href="mailto:FOREVERFADED11@YAHOO.COM">
                            <button className="gold-border-btn  font-bold py-3 px-6 rounded">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="gold-gradient-bg text-black py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Experience the Forever Faded Difference?</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        {`Join our community of satisfied clients and discover why we are Waukesha's premier barbershop.`}
                    </p>
                    <Link href="https://getsquire.com/booking/book/forever-faded-llc-waukesha">
                        <button className="bg-black hover:bg-zinc-800 text-white font-bold py-3 px-8 rounded-lg">
                            Book Your Appointment
                        </button>
                    </Link>
                </div>
            </div>

            <MapAndContact hours={hours} />
        </div>
    )
} 
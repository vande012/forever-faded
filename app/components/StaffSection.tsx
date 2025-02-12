import Image from "next/image"
import { Button } from "../components/ui/button"

interface StaffMember {
  id: number
  name: string
  role: string
  image: string
  description: string
}

const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Lead Barber",
    image: "/Staff.jpg",
    description: "Passionate about creating styles that bring out your best look.",
  },
  {
    id: 2,
    name: "Maria Lopez",
    role: "Barber Stylist",
    image: "/Staff2.jpg",
    description: "Dedicated to providing a fresh and modern experience for every client.",
  },
  {
    id: 3,
    name: "James Smith",
    role: "Senior Barber",
    image: "/Staff3.jpg",
    description: "Expert in classic cuts with a contemporary twist.",
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Barber Apprentice",
    image: "/Staff4.jpg",
    description: "Eager to learn and grow in the art of barbering.",
  },
  {
    id: 5,
    name: "Michael Brown",
    role: "Creative Stylist",
    image: "/Staff5.jpg",
    description: "Bringing innovative styles and fresh ideas to every haircut.",
  },
  {
    id: 6,
    name: "Sophia Green",
    role: "Barber Stylist",
    image: "/Staff6.jpg",
    description: "Committed to making every client feel confident and stylish.",
  },
  {
    id: 7,
    name: "David Lee",
    role: "Master Barber",
    image: "/Staff7.jpg",
    description: "Specializing in precision cuts and beard grooming.",
  },
]

export default function StaffSection() {
  return (
    <section className="py-12 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold gold-gradient-text text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {staffMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)]"
            >
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg gold-gradient-text">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                <p className="text-sm mb-4 text-white">{member.description}</p>
                <Button className="w-full gold-gradient-bg">Book Now</Button>
              </div>
            </div>
          ))}
          
          {/* Hiring CTA Card */}
          <div className="bg-black/50 rounded-lg shadow-md overflow-hidden w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex flex-col justify-center items-center p-8">
            <h3 className="text-3xl font-bold gold-gradient-text text-center mb-4">We are hiring!</h3>
            <p className="text-white text-center mb-6">Check out our open positions and apply today!</p>
            <Button className="gold-gradient-bg">Open positions</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
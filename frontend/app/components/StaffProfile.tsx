"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Define the interface for a staff member
interface StaffMember {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
}

// Sample data for staff members
const staffData: StaffMember[] = [
  {
    id: "tim",
    name: "Timothy L Retic SR",
    title: "Owner",
    image: "/theowner-profile.jpg",
    bio: `Timothy L Retic SR is the visionary owner behind Forever Faded Barbershop. While Tim's expertise as a Master Barber is unquestionable, he no longer cuts hair at Forever Faded. Instead, he focuses on the strategic direction of the business and mentoring his talented team of barbers who deliver exceptional service daily.

For those interested in SMP services, Tim welcomes consultations through his specialized booking system. While you won't find him behind the chair at Forever Faded, his influence and standards of excellence permeate every aspect of the barbershop experience.`
  },
  {
    id: "angel",
    name: "Angel",
    title: "Barber",
    image: "/Angel.jpg",
    bio: `Being a barber was unexpected, but I don't regret it for a second. Growing up, I never imagined that cutting hair would become my career. I had other dreams, and barbering wasn't even on my radar. But life has a way of surprising you, and sometimes the best paths are the ones you never saw coming.

It all started when I began cutting hair for friends. At first, it was just a fun thing to do on the side, but I soon realized how much I enjoyed it. I saw how a haircut could change someone's look and boost their confidence. I started to see how much people appreciated the small details and effort I put into my work, and that was a big turning point. It made me realize that I could turn this skill into something more than just a hobby.

I started working at Forever Faded in 2023 and I have been more than grateful with all the people I've met. Working as a barber at Forever Faded made me realize how much I loved the creative aspect of barbering. I started to master different techniques and most importantly I started to build a connection with my clients. I wasn't just cutting hair; I was providing an experience that allowed people to walk out of the shop feeling better about themselves. That feeling made me realize I have a true passion for barbering.

My plans are to keep delivering good haircuts and to be as responsible as I can be, because thanks to all my clients I've had the opportunity to see how a simple haircut can open up many doors. I'm proud of where I am now, and I'm excited about where this journey will take me in the future because barbering is not just a career; it's a way of life. It's where my creativity, passion, and purpose all come together, and I wouldn't trade it for anything.`
  },
  {
    id: "brian",
    name: "Bryan",
    title: "Barber",
    image: "/Brian.jpg",
    bio: `Coming soon!`
  },
  {
    id: "christian",
    name: "Christian",
    title: "Barber",
    image: "/Cristian.jpg",
    bio: `I started on a path to get my life together and finally set a course for my future. That started with barbering, I went to school at the Aveda Institute of beauty and wellness earning my cosmetology degree. I started school there October 16th of 2023, being voted class leader shortly after. Gaining experience in a leadership position and helping everybody succeed. 

Then in March of 2024 I started my job at Forever Faded being in school Mon-Wed 10-9 and then working Thur-Sat 10-6. The grueling 57hr weeks gave me a new sense of dedication and determination improving my mental strength and perseverance. I picked up the skill of barbering extremely quickly being trusted to do $40 haircuts without supervision only 2 months after starting. 

Then finally in early November of 2024 I Graduated the Institute of beauty and wellness, top of my class in most categories. I took my state tests asap and earned my official cos. license. I now continue my journey working towards growth and improving my skills everyday, striving to truly be placed among the best barbers.`
  },
  {
    id: "chelsea",
    name: "Chelsea",
    title: "Barber",
    image: "/Chelsea.png",
    bio: `Hey, I'm Chelsea! My journey as a barber started in 2019 when I began as an apprentice, but it really began back when I worked as a receptionist at a barbershop. It didn't take long for me to fall in love with the craft, and my coworkers noticed my natural talent and pushed me to take it further. I honestly never thought I'd find a job I love this much—barbering is my passion, and I love helping people look and feel their best with a fresh cut and great conversation.

In 2020, I joined the Forever Faded team after a sudden career change, and I quickly found more than just a job—I found a new home and a supportive family in both my coworkers and clients. The encouragement from everyone has been incredible, and it's helped my love for barbering, and my skills, to grow even more. When I'm not at the shop, you can find me chasing around my two young sons, but I'm beyond grateful to be part of the Forever Faded family.

I'm all about cutting hair, and I plan to keep doing it for as long as I can. That said, I'm also focused on growing my career, and I'd love to take on more leadership roles at the shop in the future, with the goal of eventually getting into ownership. I'm excited to combine my love for barbering with helping steer the direction of the business.`
  },
  {
    id: "megan",
    name: "Megan",
    title: "Barber",
    image: "/Megan.jpeg",
    bio: `Hi, my name is Megan! I am a proud barber at Forever Faded where if you can grow it we can cut it. When I am not at work I love spending time with my three dogs, being outside enjoying the nice weather or taking cuddles up inside taking really long naps!

I have been in the industry for five almost six years now and couldn't see myself doing anything else. I have been with Forever Faded my entire career fresh out of school, where I originally started with intentions of becoming a makeup artist. Inevitably I fell in love with barbering and was brought under the wing of the experienced barbers at Forever Faded and learned everything I know now!

My ultimate goal is becoming a shop owner as well as opening suite rentals for anyone in the beauty industry to do what they love.`
  },
  {
    id: "juan",
    name: "Juan",
    title: "Barber",
    image: "/Juan.jpg",
    bio: `My name is Juan, I attended barber school in MATC and graduated October of 2024. I've had a passion for barbering since high school and finally decided to take it to the next level. I'm excited to learn and perfect my craft being here at the Forever Faded Barbershop.`
  },
  {
    id: "davy",
    name: "Davy",
    title: "Barber",
    image: "/Davy.jpg",
    bio: `Hello, my name is Davy

I am a barber at Forever Faded Barbershop. With an ambition and motivation to master this craft. Barbering has honestly helped me in so many ways since I started 2 1/2 years ago. I had a vivid dream of myself cutting hair and being really good at it and passionate about it. Which is ironic because I was thinking of a career change and this felt like the right one.

It has taught me to be more confident in myself and to share that energy and passion with my clients and the people around me. It is all about connecting and building relationships and making our people feel good about themselves when they leave. That’s what I will bring to Forever Faded as well.

I am excited to learn and soak up all the knowledge. To become the best barber, friend, AND mentor to those I cut and bring into the shop. Because there is nothing more than feeling welcomed somewhere and leaving looking and feeling great. Being part of that atmosphere and team is a blessing.`
  },
];

export default function StaffProfiles() {
  // Function to format bio text with proper paragraph breaks
  const formatBio = (bio: string) => {
    return bio.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-300 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  // Function to determine card style based on bio length
  const getCardStyle = (bioLength: number, memberId: string) => {
    // Get image positioning based on member id
    const getImagePosition = (id: string) => {
      switch(id) {
      
        case "brian": 
        case "bryan": return "center -60px";
        case "juan": return "center 10%";
        case "christian": 
        case "cristian": return "center -50px";
        case "chelsea": return "center -140px";
        case "angel": return "center -20px";
        case "davy": return "center -80px";

        default: return "top center";
      }
    };

    // Special case for Juan's image
    if (memberId === "juan") {
      return {
        containerClass: "bg-black/50 rounded-lg shadow-xl overflow-hidden",
        layoutClass: "flex flex-col md:flex-row",
        imageContainerClass: "w-full md:w-1/3 relative",
        imageClass: "h-[350px] md:h-[400px]",
        contentClass: "w-full md:w-2/3 p-6 md:p-8",
        imageObjectFit: "object-contain",
        imagePosition: "center center"
      };
    }
    // Special case for Brian's image - remove with content addition
    else if (memberId === "brian") {
      return {
        containerClass: "bg-black/50 rounded-lg shadow-xl overflow-hidden",
        layoutClass: "flex flex-col md:flex-row",
        imageContainerClass: "w-full md:w-1/3 relative",
        imageClass: "h-[250px] md:h-[300px]",
        contentClass: "w-full md:w-2/3 p-6 md:p-8",
        imageObjectFit: "object-cover",
        imagePosition: getImagePosition(memberId)
      };
    }
    // Short bios get a more compact card
    else if (bioLength < 200) {
      return {
        containerClass: "bg-black/50 rounded-lg shadow-xl overflow-hidden",
        layoutClass: "flex flex-col md:flex-row",
        imageContainerClass: "w-full md:w-1/3 relative",
        imageClass: "h-[250px] md:h-[300px]",
        contentClass: "w-full md:w-2/3 p-6 md:p-8",
        imageObjectFit: "object-cover",
        imagePosition: getImagePosition(memberId)
      };
    }
    // Medium bios
    else if (bioLength < 800) {
      return {
        containerClass: "bg-black/50 rounded-lg shadow-xl overflow-hidden",
        layoutClass: "flex flex-col lg:flex-row",
        imageContainerClass: "w-full lg:w-2/5 relative",
        imageClass: "h-[300px] md:h-[350px] lg:h-full",
        contentClass: "w-full lg:w-3/5 p-6 lg:p-8",
        imageObjectFit: "object-cover",
        imagePosition: getImagePosition(memberId)
      };
    }
    // Long bios
    else {
      return {
        containerClass: "bg-black/50 rounded-lg shadow-xl overflow-hidden",
        layoutClass: "flex flex-col lg:flex-row",
        imageContainerClass: "w-full lg:w-1/3 relative",
        imageClass: "h-[300px] md:h-[400px] lg:h-full",
        contentClass: "w-full lg:w-2/3 p-6 lg:p-10",
        imageObjectFit: "object-cover",
        imagePosition: getImagePosition(memberId)
      };
    }
  };

  return (
    <section className="py-16 bg-[#1d1d1d]">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {staffData.map((member) => {
            const style = getCardStyle(member.bio.length, member.id);
            
            // Get the correct booking URL for each barber
            let bookingUrl = "";
            switch(member.id) {
              case "tim":
                bookingUrl = "https://getsquire.com/booking/book/all-star-smp-lab-waukesha/barber/tim-retic-1/services";
                break;
              case "angel":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/angel-rafael/services";
                break;
              case "brian":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/bryan-lembrino/services";
                break;
              case "christian":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/cristian-nellis/services";
                break;
              case "chelsea":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/chelsea-kuehl/services";
                break;
              case "megan":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/megan-ewing/services";
                break;
              case "juan":
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha/barber/juan-lazcano/services";
                break;
              default:
                bookingUrl = "https://getsquire.com/booking/book/forever-faded-llc-waukesha";
            }
            
            return (
              <div 
                key={member.id} 
                className={`${style.containerClass} scroll-mt-40`}
                id={`barber-${member.id}`}
              >
                <div className={style.layoutClass}>
                  {/* Image column - adaptive height based on bio length */}
                  <div className={style.imageContainerClass}>
                    <div className={`lg:relative lg:top-0 ${style.imageClass} relative flex items-center justify-center bg-black`}>
                      {member.id === "juan" ? (
                        <div className="w-full h-full relative overflow-hidden">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(min-width: 768px) 33vw, 100vw"
                            className="object-contain"
                            style={{ objectPosition: style.imagePosition }}
                            loading="lazy"
                          />
                        </div>
                      ) : member.id === "brian" ? (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <div className="w-[300px] h-[300px] relative overflow-hidden">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="(min-width: 768px) 33vw, 100vw"
                              className="object-cover"
                              style={{ objectPosition: style.imagePosition }}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className={style.imageObjectFit}
                          style={{
                            objectPosition: style.imagePosition
                          }}
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                  
                  {/* Content column */}
                  <div className={style.contentClass}>
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold gold-gradient-text mb-2">
                        {member.name}
                      </h3>
                      <p className="text-xl text-gray-400">{member.title}</p>
                    </div>
                    
                    {/* Bio with proper formatting */}
                    <div className={`prose prose-lg prose-invert max-w-none mb-8 ${member.bio.length < 200 ? 'text-center md:text-left' : ''}`}>
                      {formatBio(member.bio)}
                    </div>
                    
                    {/* Book Now Button */}
                    <div className={`mt-8 ${member.bio.length < 200 ? 'text-center md:text-left' : ''}`}>
                      {/* Special buttons for Tim with both email and booking */}
                      {member.id === "tim" ? (
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link 
                            href="mailto:tim.retic@retici.com?subject=Forever%20Faded%20Inquiry"
                            className="inline-block w-full sm:w-auto text-center gold-border-btn px-8 py-3 rounded-md font-medium text-lg"
                          >
                            Contact Tim
                          </Link>
                          
                          
                          <Link 
                            href="https://smplab.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full sm:w-auto text-center gold-border-btn px-8 py-3 rounded-md font-medium text-lg"
                          >
                            Learn more about SMP
                          </Link>
                        </div>
                      ) : (
                        <Link 
                          href={bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block gold-gradient-bg text-white px-8 py-3 rounded-md font-medium text-lg"
                        >
                          Book with {member.name}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 
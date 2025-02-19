"use client";
import { Button } from "../components/ui/button";
export default function ServicesSection() {
  return (
    <section className="w-full py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Face & Beard Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20"
                  viewBox="0 0 107 109"
                  fill="none"
                ></svg>
              </div>
              <h2 className="font-urbanist text-2xl font-bold text-white bg-clip-text">
                Face & Beard
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Beard & Head Lining
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Precision beard and head lining for a sharp, clean look.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Beard Shave
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Smooth, clean shave with a hot towel treatment.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Full Facial & Hot Shave
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Relaxing facial treatment with a hot towel shave.
                </p>
              </div>
            </div>
          </div>
          {/* Hair Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="88"
                  height="87"
                  viewBox="0 0 88 87"
                  fill="none"
                >
                  
                </svg>
              </div>
              <h2 className="font-urbanist text-2xl font-bold text-white bg-clip-text">
                Hair
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">Cut</h3>
                <p className="font-roboto text-sm text-gray-400">
                  Expert haircut tailored to your style.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Full Service
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Haircut, wash, and styling for a complete look.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Cut & Color
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Haircut with professional coloring.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">
                  Custom Hair Design
                </h3>
                <p className="font-roboto text-sm text-gray-400">
                  Personalized haircut and design to match your personality.
                </p>
              </div>
            </div>
          </div>
          {/* Kids & Teen Services */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 76 80"
                  fill="none"
                >
                  <path
                    d="M57.1552 5.51791C62.8331 8.98131 67.5564 13.9513 70.8574 19.9358C74.1584 25.9203 75.9227 32.7118 75.9757 39.638C76.0286 46.5642 74.3684 53.385 71.1593 59.425C67.9502 65.4651 63.3036 70.515 57.6794 74.0748C52.0552 77.6347 45.6485 79.581 39.0935 79.7212C32.5384 79.8613 26.0624 78.1904 20.3065 74.8739C14.5506 71.5574 9.71432 66.7102 6.27655 60.8123C2.83878 54.9144 0.918676 48.1702 0.706323 41.2473L0.6875 39.9588L0.706323 38.6702C0.959744 30.3949 3.65164 22.4094 8.40655 15.8276C13.1615 9.24587 19.7423 4.396 27.2311 1.95451C26.9233 3.67861 26.9792 5.4532 27.3949 7.15185C27.8105 8.8505 28.5757 10.4314 29.6358 11.7819C30.696 13.1324 32.025 14.2193 33.5282 14.9651C35.0315 15.7109 36.6719 16.0973 38.3327 16.0968C39.3311 16.0968 40.2886 15.6777 40.9946 14.9319C41.7006 14.1861 42.0972 13.1745 42.0972 12.1197C42.0972 11.065 41.7006 10.0534 40.9946 9.30757C40.2886 8.56174 39.3311 8.14274 38.3327 8.14274L37.8922 8.1149C36.9394 7.99517 36.0659 7.49562 35.45 6.7183C34.8342 5.94098 34.5226 4.94457 34.5788 3.93265C34.635 2.92074 35.0549 1.96969 35.7526 1.27384C36.4503 0.577987 37.3732 0.189845 38.3327 0.188721C44.8302 0.188721 51.3315 1.96644 57.1552 5.51791ZM50.3791 49.0502C49.6662 48.312 48.7049 47.9031 47.7067 47.9136C46.7084 47.924 45.755 48.3529 45.0561 49.1059C44.1798 50.0511 43.1337 50.802 41.9792 51.3146C40.8247 51.8272 39.585 52.0913 38.3327 52.0913C37.0803 52.0913 35.8406 51.8272 34.6861 51.3146C33.5316 50.802 32.4855 50.0511 31.6092 49.1059C30.9068 48.3703 29.9585 47.9563 28.9694 47.9534C27.9803 47.9505 27.0299 48.359 26.3236 49.0905C25.6173 49.822 25.2119 50.8178 25.195 51.8626C25.1782 52.9074 25.5512 53.9172 26.2335 54.6737C27.8107 56.374 29.6933 57.7248 31.7708 58.647C33.8484 59.5691 36.0792 60.0441 38.3327 60.0441C40.5861 60.0441 42.8169 59.5691 44.8945 58.647C46.972 57.7248 48.8546 56.374 50.4318 54.6737C51.1306 53.9206 51.5176 52.905 51.5077 51.8504C51.4978 50.7959 51.0919 49.7886 50.3791 49.0502ZM27.0768 28.0278L26.5987 28.0556C25.6459 28.1753 24.7723 28.6749 24.1565 29.4522C23.5406 30.2295 23.229 31.2259 23.2852 32.2379C23.3415 33.2498 23.7613 34.2008 24.459 34.8967C25.1567 35.5925 26.0796 35.9807 27.0391 35.9818L27.5172 35.9539C28.47 35.8342 29.3435 35.3347 29.9594 34.5574C30.5752 33.78 30.8869 32.7836 30.8306 31.7717C30.7744 30.7598 30.3545 29.8087 29.6568 29.1129C28.9591 28.417 28.0363 28.0289 27.0768 28.0278ZM49.6638 28.0278L49.1858 28.0556C48.233 28.1753 47.3594 28.6749 46.7436 29.4522C46.1277 30.2295 45.8161 31.2259 45.8723 32.2379C45.9286 33.2498 46.3484 34.2008 47.0461 34.8967C47.7438 35.5925 48.6667 35.9807 49.6262 35.9818L50.1043 35.9539C51.0571 35.8342 51.9306 35.3347 52.5465 34.5574C53.1623 33.78 53.4739 32.7836 53.4177 31.7717C53.3615 30.7598 52.9416 29.8087 52.2439 29.1129C51.5462 28.417 50.6233 28.0289 49.6638 28.0278Z"
                    fill="url(#paint0_linear_84_38626)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_84_38626"
                      x1="0.6875"
                      y1="39.959"
                      x2="75.9769"
                      y2="39.959"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A47A1E" />
                      <stop offset="0.24" stopColor="#D3A84C" />
                      <stop offset="0.485" stopColor="#D3A84C" />
                      <stop offset="0.69" stopColor="#E6BE69" />
                      <stop offset="0.8375" stopColor="#AA8A48" />
                      <stop offset="0.985" stopColor="#B58F3E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h2 className="font-urbanist text-2xl font-bold text-white bg-clip-text">
                Kids & Teen
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">Kids Cut</h3>
                <p className="font-roboto text-sm text-gray-400">
                  Gentle haircuts specially designed for children.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-urbanist text-lg text-white">Teen Cut</h3>
                <p className="font-roboto text-sm text-gray-400">
                  Style-focused cuts perfect for teenagers.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Military & First Responder Discount */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#C6A55C]/10 via-[#E3CC88]/10 to-[#C6A55C]/10 rounded-lg border border-[#C6A55C]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="99"
                  height="72"
                  viewBox="0 0 99 72"
                  fill="none"
                >
                  <path
                    d="M0.723877 0.669678V39.828H98.4815V31.9964H53.3626V24.1647H98.4815V16.333H53.3626V8.50135H98.4815V0.669678H0.723877ZM8.24369 4.58551C9.24088 4.58551 10.1972 4.99807 10.9023 5.73244C11.6075 6.4668 12.0036 7.4628 12.0036 8.50135C12.0036 9.53989 11.6075 10.5359 10.9023 11.2703C10.1972 12.0046 9.24088 12.4172 8.24369 12.4172C7.2465 12.4172 6.29016 12.0046 5.58504 11.2703C4.87992 10.5359 4.48378 9.53989 4.48378 8.50135C4.48378 7.4628 4.87992 6.4668 5.58504 5.73244C6.29016 4.99807 7.2465 4.58551 8.24369 4.58551ZM23.2833 4.58551C24.2805 4.58551 25.2369 4.99807 25.942 5.73244C26.6471 6.4668 27.0432 7.4628 27.0432 8.50135C27.0432 9.53989 26.6471 10.5359 25.942 11.2703C25.2369 12.0046 24.2805 12.4172 23.2833 12.4172C22.2861 12.4172 21.3298 12.0046 20.6247 11.2703C19.9195 10.5359 19.5234 9.53989 19.5234 8.50135C19.5234 7.4628 19.9195 6.4668 20.6247 5.73244C21.3298 4.99807 22.2861 4.58551 23.2833 4.58551ZM38.3229 4.58551C39.3201 4.58551 40.2765 4.99807 40.9816 5.73244C41.6867 6.4668 42.0829 7.4628 42.0829 8.50135C42.0829 9.53989 41.6867 10.5359 40.9816 11.2703C40.2765 12.0046 39.3201 12.4172 38.3229 12.4172C37.3258 12.4172 36.3694 12.0046 35.6643 11.2703C34.9592 10.5359 34.563 9.53989 34.563 8.50135C34.563 7.4628 34.9592 6.4668 35.6643 5.73244C36.3694 4.99807 37.3258 4.58551 38.3229 4.58551ZM15.7635 16.333C16.7607 16.333 17.717 16.7456 18.4222 17.4799C19.1273 18.2143 19.5234 19.2103 19.5234 20.2489C19.5234 21.2874 19.1273 22.2834 18.4222 23.0178C17.717 23.7521 16.7607 24.1647 15.7635 24.1647C14.7663 24.1647 13.81 23.7521 13.1049 23.0178C12.3997 22.2834 12.0036 21.2874 12.0036 20.2489C12.0036 19.2103 12.3997 18.2143 13.1049 17.4799C13.81 16.7456 14.7663 16.333 15.7635 16.333ZM30.8031 16.333C31.8003 16.333 32.7567 16.7456 33.4618 17.4799C34.1669 18.2143 34.563 19.2103 34.563 20.2489C34.563 21.2874 34.1669 22.2834 33.4618 23.0178C32.7567 23.7521 31.8003 24.1647 30.8031 24.1647C29.8059 24.1647 28.8496 23.7521 28.1445 23.0178C27.4394 22.2834 27.0432 21.2874 27.0432 20.2489C27.0432 19.2103 27.4394 18.2143 28.1445 17.4799C28.8496 16.7456 29.8059 16.333 30.8031 16.333ZM45.8428 16.333C46.84 16.333 47.7963 16.7456 48.5014 17.4799C49.2065 18.2143 49.6027 19.2103 49.6027 20.2489C49.6027 21.2874 49.2065 22.2834 48.5014 23.0178C47.7963 23.7521 46.84 24.1647 45.8428 24.1647C44.8456 24.1647 43.8892 23.7521 43.1841 23.0178C42.479 22.2834 42.0829 21.2874 42.0829 20.2489C42.0829 19.2103 42.479 18.2143 43.1841 17.4799C43.8892 16.7456 44.8456 16.333 45.8428 16.333ZM8.24369 28.0805C9.24088 28.0805 10.1972 28.4931 10.9023 29.2274C11.6075 29.9618 12.0036 30.9578 12.0036 31.9964C12.0036 33.0349 11.6075 34.0309 10.9023 34.7653C10.1972 35.4996 9.24088 35.9122 8.24369 35.9122C7.2465 35.9122 6.29016 35.4996 5.58504 34.7653C4.87992 34.0309 4.48378 33.0349 4.48378 31.9964C4.48378 30.9578 4.87992 29.9618 5.58504 29.2274C6.29016 28.4931 7.2465 28.0805 8.24369 28.0805ZM23.2833 28.0805C24.2805 28.0805 25.2369 28.4931 25.942 29.2274C26.6471 29.9618 27.0432 30.9578 27.0432 31.9964C27.0432 33.0349 26.6471 34.0309 25.942 34.7653C25.2369 35.4996 24.2805 35.9122 23.2833 35.9122C22.2861 35.9122 21.3298 35.4996 20.6247 34.7653C19.9195 34.0309 19.5234 33.0349 19.5234 31.9964C19.5234 30.9578 19.9195 29.9618 20.6247 29.2274C21.3298 28.4931 22.2861 28.0805 23.2833 28.0805ZM38.3229 28.0805C39.3201 28.0805 40.2765 28.4931 40.9816 29.2274C41.6867 29.9618 42.0829 30.9578 42.0829 31.9964C42.0829 33.0349 41.6867 34.0309 40.9816 34.7653C40.2765 35.4996 39.3201 35.9122 38.3229 35.9122C37.3258 35.9122 36.3694 35.4996 35.6643 34.7653C34.9592 34.0309 34.563 33.0349 34.563 31.9964C34.563 30.9578 34.9592 29.9618 35.6643 29.2274C36.3694 28.4931 37.3258 28.0805 38.3229 28.0805ZM0.723877 47.6597V55.4914H98.4815V47.6597H0.723877ZM0.723877 63.323V71.1547H98.4815V63.323H0.723877Z"
                    fill="url(#paint0_linear_84_38631)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_84_38631"
                      x1="0.723877"
                      y1="35.9122"
                      x2="98.4815"
                      y2="35.9122"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#A47A1E" />
                      <stop offset="0.24" stopColor="#D3A84C" />
                      <stop offset="0.485" stopColor="#D3A84C" />
                      <stop offset="0.69" stopColor="#E6BE69" />
                      <stop offset="0.8375" stopColor="#AA8A48" />
                      <stop offset="0.985" stopColor="#B58F3E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <h2 className="font-urbanist text-2xl font-bold text-white bg-clip-text">
                  Military & First Responder Discount
                </h2>
                <p className="font-roboto text-sm text-gray-400">
                  Special pricing for our service members
                </p>
              </div>
            </div>
            <Button className="gold-gradient-bg text-black hover:from-[#E3CC88] hover:via-[#C6A55C] hover:to-[#E3CC88] transition-all duration-300">
              Book Now
            </Button>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-400 font-roboto">
          Pricing varies based on stylist rates*
        </p>
      </div>
    </section>
  );
}

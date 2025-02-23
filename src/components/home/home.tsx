import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, Menu, Play, Pause } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { removeAuthToken } from "@/lib/storage";
import FeatureCard from "./feature-card";
import { fetchUserProfile } from "@/api/auth";
import CurateModal from "./curate-modal";
import feature1 from "@/assets/feature1.svg";
import feature2 from "@/assets/feature2.svg";
import feature3 from "@/assets/feature3.svg";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isCurateModalOpen, setIsCurateModalOpen] = useState(false)

  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    retry: false,
  });

  const logout = () => {
    removeAuthToken();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleVideo = async () => {
    if (!videoRef.current || isLoading) return

    setIsLoading(true)
    try {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        await videoRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error("Error toggling video:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            <div className="flex items-center gap-8">
              <h1 className="font-bold text-xl">TRAVEL SHOP</h1>
              <nav className="hidden md:flex gap-6">
                <Link to="#" className="text-sm">
                  Buy
                </Link>
                <Link
                  to="#"
                  className="text-sm"
                  onClick={() => setIsCurateModalOpen(true)}
                >
                  Curate
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative w-64">
                <Input type="search" placeholder="Search" className="pl-8" />
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="md:hidden flex gap-4">
                <button>
                  <Search className="h-5 w-5" />
                </button>
                <button>
                  <Menu className="h-5 w-5" />
                </button>
              </div>
              <Link to="#" className="hidden md:block text-sm">
                Contact Us
              </Link>
              <Button
                onClick={logout}
                size="lg"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {isCurateModalOpen && (
          <CurateModal
            close={() => setIsCurateModalOpen(false)}
          />
        )}
      </header>

      <section
        className="relative h-[80vh] md:h-screen bg-black/50 flex items-center cursor-pointer"
        onClick={toggleVideo}
      >
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            autoPlay
          >
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 right-10 bottom-10 flex items-end justify-end">
            <div
              className={cn(
                "rounded-full bg-white/20 p-6 backdrop-blur-sm transition-transform",
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-110",
              )}
            >
              {isLoading ? (
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
              ) : isPlaying ? (
                <Pause className="h-12 w-12 text-white" />
              ) : (
                <Play className="h-12 w-12 text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-white">
          <h2 className="text-3xl md:text-5xl font-bold max-w-2xl mb-4">
            Welcome, {user?.username}!
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua
          </p>
          <Button
            onClick={(e) => e.stopPropagation()}
            size="lg"
          >
            Start Curating
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-primary text-2xl md:text-4xl text-center mb-12">Lorem ipsum dolor sit amet</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-20">
            <FeatureCard
              title="Lorem ipsum"
              icon={<img className="w-8 h-8" src={feature1} />}
            />
            <FeatureCard
              title="Lorem ipsum"
              icon={<img className="w-8 h-8" src={feature2} />}
            />
            <FeatureCard
              title="Lorem ipsum"
              icon={<img className="w-8 h-8" src={feature3} />}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Lorem ipsum <span className="text-primary">dolor</span>
              </h2>
              <Button variant="outline" size="lg" className="hidden sm:block">
                sit amet
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-50 p-6 rounded-lg">
                <span className="text-primary text-xl font-bold">01</span>
                <h3 className="text-xl mt-2">Sit Amet</h3>
              </div>
              <div className="bg-pink-50 p-6 rounded-lg">
                <span className="text-primary text-xl font-bold">02</span>
                <h3 className="text-xl mt-2">
                  <span className="text-primary">Lorem</span> Ipsum Dolor Sit Amet
                </h3>
              </div>
              <div className="sm:col-span-2 bg-pink-50 p-6 rounded-lg">
                <span className="text-primary text-xl font-bold">03</span>
                <h3 className="text-xl mt-2">
                  Consectetur <span className="text-primary">Adipiscing</span> Elit, Ut Labore Et Dolore
                </h3>
              </div>
            </div>
            <div className="block sm:hidden">
              <Button variant="outline" size="lg">
                sit amet
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="sm:col-span-2">
              <h3 className="font-bold text-xl mb-6">TRAVEL SHOP</h3>
            </div>
            <div>
              <ul className="space-y-4">
                <li>
                  <Link to="#" className="text-gray-600">
                    sit amet
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    ipsum
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    ut labore
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    consectetur
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li>
                  <Link to="#" className="text-gray-600">
                    sit amet
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    ipsum
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    ut labore
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-600">
                    consectetur
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

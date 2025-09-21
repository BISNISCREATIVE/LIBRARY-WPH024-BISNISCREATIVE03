import { Facebook, Instagram, Linkedin, Music } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Logo and tagline */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">Booky</span>
          </div>
          
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Discover inspiring stories & timeless knowledge, ready to borrow anytime. 
            Explore online or visit our nearest library branch.
          </p>
        </div>

        {/* Social Media */}
        <div className="text-center mb-6">
          <p className="text-sm font-medium text-foreground mb-4">Follow on Social Media</p>
          <div className="flex items-center justify-center space-x-4">
            <a
              href="#"
              className="w-10 h-10 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
            >
              <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
            >
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
            >
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-muted hover:bg-accent rounded-lg flex items-center justify-center transition-colors"
            >
              <Music className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground">
          © 2024 Booky. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
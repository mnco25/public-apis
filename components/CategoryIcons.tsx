import {
    Cloud,
    BarChart3,
    Heart,
    Book,
    Car,
    Gamepad2,
    Users,
    Map,
    ShoppingCart,
    Newspaper,
    Code2,
    MessageSquare,
    Shield,
    Music,
    Video,
    Database,
    Box,
    LayoutGrid
} from "lucide-react";

export const categoryIcons: Record<string, React.ReactNode> = {
    "Weather": <Cloud className="w-6 h-6" />,
    "Finance & Markets": <BarChart3 className="w-6 h-6" />,
    "Health": <Heart className="w-6 h-6" />,
    "Books": <Book className="w-6 h-6" />,
    "Transportation": <Car className="w-6 h-6" />,
    "Games & Comics": <Gamepad2 className="w-6 h-6" />,
    "Social": <Users className="w-6 h-6" />,
    "Geocoding": <Map className="w-6 h-6" />,
    "E-Commerce": <ShoppingCart className="w-6 h-6" />,
    "News": <Newspaper className="w-6 h-6" />,
    "Development Tools": <Code2 className="w-6 h-6" />,
    "Communication": <MessageSquare className="w-6 h-6" />,
    "Security": <Shield className="w-6 h-6" />,
    "Music": <Music className="w-6 h-6" />,
    "Video": <Video className="w-6 h-6" />,
    "Data": <Database className="w-6 h-6" />,
    // Fallback
    "default": <Box className="w-6 h-6" />
};

export function getCategoryIcon(categoryName: string) {
    return categoryIcons[categoryName] || <LayoutGrid className="w-6 h-6" />;
}

import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";

interface ActionButtonProps {
  href: string;
  children: React.ReactNode;
}

export const ActionButton = ({ href, children }: ActionButtonProps) => (
  <NextLink href={href} passHref>
    <Button
      as="a"
      variant="outline"
      size="lg"
      fontWeight="medium"
      rightIcon={<ChevronRight className="w-4 h-4" />}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      {children}
    </Button>
  </NextLink>
);

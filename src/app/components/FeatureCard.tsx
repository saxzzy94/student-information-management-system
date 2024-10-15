import { Box, Heading, Text, Icon, Flex, useColorModeValue } from "@chakra-ui/react";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Flex align="center" gap={4}>
        <Icon
          as={feature.icon}
          boxSize={6}
          className="text-gray-500 dark:text-gray-400"
        />
        <Box>
          <Heading
            as="h4"
            size="md"
            className="text-gray-800 dark:text-gray-200"
          >
            {feature.title}
          </Heading>
          <Text color={textColor} mt={1}>
            {feature.description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

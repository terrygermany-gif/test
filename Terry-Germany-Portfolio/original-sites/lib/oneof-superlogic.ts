import {z} from 'zod';
const short=z.string().trim().min(1).max(400),text=z.string().trim().min(1).max(8000);
const media=z.string().regex(/^\/(api\/portfolio-media\/[0-9a-f-]{36}|work\/[a-zA-Z0-9_.-]+)$/);
const artifact=z.object({title:short,description:text,image:media,alt:short}).strict();
const note=z.object({title:short,description:text}).strict();
const contributionSchema=z.object({title:short,led:text,learned:text,changed:text,evidenceTitle:short,evidence:z.array(z.object({title:short,description:text,references:z.array(z.object({group:z.enum(["desktop","creation","starting","overviewVisuals"]),index:z.number().int().min(0).max(11)}).strict()).max(4)}).strict()).min(1).max(6)}).strict();
export const defaultOneofSuperlogic={
  "client": "OneOf",
  "role": "Research lead · UX & UI design",
  "timeline": "2 months",
  "tools": "Figma, FigJam, Miro",
  "overview": "A dashboard experience for people collecting and creating digital assets. My work brought collections, activity, payouts, and NFT creation together across desktop and mobile.",
  "approachTitle": "From product structure to interface detail.",
  "approachIntro": "My work spanned research, product visualization, prototyping, and testing over a two-month project. These artifacts show how the experience was mapped and explored.",
  "approach": [
    {
      "title": "Map the experience",
      "description": "Use personas, sitemaps, and process maps to organize the dashboard experience before refining the screens."
    },
    {
      "title": "Explore across devices",
      "description": "Develop low- and high-fidelity directions for dashboards, collections, payouts, and creation on desktop and mobile."
    },
    {
      "title": "Connect the journey",
      "description": "Bring the screen designs into interactive prototyping and testing as part of the product design process."
    }
  ],
  "startingTitle": "Product maps & early structure",
  "startingIntro": "The original process maps capture the structure behind the dashboard and creation workflows.",
  "starting": [
    {
      "title": "Product structure",
      "description": "An overview of the product structure and the connections between its key areas.",
      "image": "/work/oneof-one-of-miro-process-1.png",
      "alt": "OneOf process map — view 1"
    },
    {
      "title": "Workflow detail",
      "description": "A closer look at the mapped product flows that informed the interface explorations.",
      "image": "/work/oneof-one-of-miro-process-2.png",
      "alt": "OneOf process map — view 2"
    }
  ],
  "directionTitle": "Early visual directions",
  "directionIntro": "Additional mobile and desktop explorations show how the visual language carried across screen sizes.",
  "overviewVisuals": [
    {
      "title": "Mobile direction 01",
      "description": "An early mobile presentation of the dashboard experience.",
      "image": "/work/oneof-mobile2.png",
      "alt": "OneOf mobile overview — direction 1"
    },
    {
      "title": "Mobile direction 02",
      "description": "An alternate mobile direction within the same product family.",
      "image": "/work/oneof-mobile3.png",
      "alt": "OneOf mobile overview — direction 2"
    },
    {
      "title": "Desktop direction",
      "description": "A desktop overview bringing the dashboard into its device context.",
      "image": "/work/oneof-macbook-pro-1024x603.png",
      "alt": "OneOf desktop overview"
    }
  ],
  "desktopTitle": "One workspace. The details that matter.",
  "desktopIntro": "Explore the dashboard directions, collection listings, and payout states. Each view makes a different part of managing digital assets visible.",
  "desktop": [
    {
      "title": "Activity dashboard",
      "description": "A summary of sales activity, key figures, and individual assets in one desktop view.",
      "image": "/work/oneof-1-user-dashboard-v.1-dark-oneof.png",
      "alt": "OneOf user dashboard — direction 1"
    },
    {
      "title": "Analytics direction",
      "description": "An alternate dashboard combines sales history and a sales breakdown with asset-level detail.",
      "image": "/work/oneof-2-user-dashboard-v.1-dark-oneof.png",
      "alt": "OneOf user dashboard — direction 2"
    },
    {
      "title": "Collection listings",
      "description": "A list-based view brings item details, status, value, and available actions into a consistent structure.",
      "image": "/work/oneof-3-list-v.1-dark-oneof.png",
      "alt": "OneOf collection list"
    },
    {
      "title": "Items & payouts",
      "description": "A dedicated view for reviewing items and payout information.",
      "image": "/work/oneof-4-items-payouts-dark-oneof.png",
      "alt": "OneOf items and payouts"
    },
    {
      "title": "Payout empty state",
      "description": "The payout experience also accounts for a state with no payout activity to display.",
      "image": "/work/oneof-4-empty-payouts-dark-oneof.png",
      "alt": "OneOf payouts — empty state"
    }
  ],
  "creationTitle": "A complex task, one decision at a time.",
  "creationIntro": "A seven-screen flow for creating a digital collectible (NFT), from blockchain selection to a final publishing review. Choose a step to see the design.",
  "creation": [
    {
      "title": "Choose a blockchain",
      "description": "Begin with the blockchain and payment options before moving into the creation details.",
      "image": "/work/oneof-2-step-1-dark-oneof.png",
      "alt": "OneOf nft creation — step 1"
    },
    {
      "title": "Choose what to create",
      "description": "Select a single item or a collection to define the next part of the journey.",
      "image": "/work/oneof-3-step-2-dark-oneof.png",
      "alt": "OneOf nft creation — step 2"
    },
    {
      "title": "Upload the asset",
      "description": "A focused upload step gives the asset its own space before the details are entered.",
      "image": "/work/oneof-4-step-3-dark-oneof.png",
      "alt": "OneOf nft creation — step 3"
    },
    {
      "title": "Add item details",
      "description": "Enter the item name, description, properties, and pricing information.",
      "image": "/work/oneof-5-step-4-dark-oneof.png",
      "alt": "OneOf nft creation — step 4"
    },
    {
      "title": "Choose a collection",
      "description": "Create a new collection or select an existing collection for the item.",
      "image": "/work/oneof-6-step-5-dark-oneof.png",
      "alt": "OneOf nft creation — step 5"
    },
    {
      "title": "Set preferences",
      "description": "Review communication preferences with individual controls for each option.",
      "image": "/work/oneof-7-step-6-dark-oneof.png",
      "alt": "OneOf nft creation — step 6"
    },
    {
      "title": "Review & publish",
      "description": "A final item preview provides a checkpoint before publishing.",
      "image": "/work/oneof-8-step-7-dark-oneof.png",
      "alt": "OneOf nft creation — step 7"
    }
  ],
  "mobileTitle": "The same product, made for a smaller screen.",
  "mobileIntro": "Swipe through dashboard and selection screens. The mobile work keeps the focus on one task at a time.",
  "mobile": [
    {
      "title": "Dashboard overview",
      "description": "A mobile view of the dashboard and its key product information.",
      "image": "/work/oneof-dashboard-v1-iphone1.png",
      "alt": "OneOf mobile dashboard — direction 1"
    },
    {
      "title": "Dashboard alternative",
      "description": "An alternate mobile dashboard direction.",
      "image": "/work/oneof-dashboard-v2-iphone1.png",
      "alt": "OneOf mobile dashboard — direction 2"
    },
    {
      "title": "Choose a collection",
      "description": "A focused collection-selection screen for the mobile workflow.",
      "image": "/work/oneof-dashboard-choose-list-iphone1.png",
      "alt": "OneOf choose a collection"
    },
    {
      "title": "Select an item",
      "description": "Item selection presented as a dedicated mobile task.",
      "image": "/work/oneof-dashboard-choose-selectitem-iphone1.png",
      "alt": "OneOf select an item"
    },
    {
      "title": "Choose a blockchain",
      "description": "Blockchain selection adapted to a narrow screen.",
      "image": "/work/oneof-dashboard-choose-blockchain-iphone1.png",
      "alt": "OneOf choose a blockchain"
    }
  ],
  "closing": "The work connects a desktop dashboard, mobile views, and a guided creation flow into one coherent product direction.",
  "contribution": {
    "title": "Turning complexity into clear product decisions.",
    "led": "I led research, UX and UI design across desktop and mobile—from product structure and flows to prototyping and testing.",
    "learned": "My design takeaway: managing digital assets and creating a collectible need different experiences. One calls for an overview; the other, a focused sequence of decisions.",
    "changed": "I designed connected activity, collection and payout views, a guided NFT creation flow, and mobile screens.",
    "evidenceTitle": "Design decisions & supporting screens",
    "evidence": [
      {
        "title": "Separate managing assets from creating them",
        "description": "I gave ongoing activity and asset information a dashboard view, while creation starts in a dedicated flow. These screens show how I separated monitoring from making a new collectible.",
        "references": [
          {
            "group": "desktop",
            "index": 0
          },
          {
            "group": "creation",
            "index": 0
          }
        ]
      },
      {
        "title": "Clarity before commitment",
        "description": "I organized NFT creation into focused decisions and separated item details from the final publishing review. My intent was to give creators a clear sequence and a checkpoint to review their collectible before publishing.",
        "references": [
          {
            "group": "creation",
            "index": 3
          },
          {
            "group": "creation",
            "index": 6
          }
        ]
      },
      {
        "title": "Design the payout experience before data exists",
        "description": "I included both a payout view and an empty state, so the interface also accounts for an account with no payout activity to display.",
        "references": [
          {
            "group": "desktop",
            "index": 3
          },
          {
            "group": "desktop",
            "index": 4
          }
        ]
      }
    ]
  },
  "deliveryStatus": "Shipped product",
  "deliverySummary": "Design exploration → Tested prototype → Shipped product"
};
export const oneofSuperlogicSchema=z.object({client:short,role:short,timeline:short,tools:short,overview:text,deliveryStatus:short.default(defaultOneofSuperlogic.deliveryStatus),deliverySummary:text.default(defaultOneofSuperlogic.deliverySummary),approachTitle:short,approachIntro:text,approach:z.array(note).min(1).max(6),startingTitle:short,startingIntro:text,starting:z.array(artifact).min(1).max(8),directionTitle:short,directionIntro:text,overviewVisuals:z.array(artifact).min(1).max(8),desktopTitle:short,desktopIntro:text,desktop:z.array(artifact).min(1).max(12),creationTitle:short,creationIntro:text,creation:z.array(artifact).min(1).max(12),mobileTitle:short,mobileIntro:text,mobile:z.array(artifact).min(1).max(12),closing:text,contribution:contributionSchema.default(()=>contributionSchema.parse(defaultOneofSuperlogic.contribution))}).strict().default(()=>({...structuredClone(defaultOneofSuperlogic),contribution:contributionSchema.parse(defaultOneofSuperlogic.contribution)}));
export type OneofSuperlogic=z.infer<typeof oneofSuperlogicSchema>;

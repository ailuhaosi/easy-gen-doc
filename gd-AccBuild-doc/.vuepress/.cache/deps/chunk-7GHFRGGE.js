import {
  useArticles,
  useBlogOptions,
  useCategoryMap,
  useTagMap,
  useTimelines
} from "./chunk-F6IBGHRG.js";
import {
  useNavigate,
  usePure,
  useThemeLocaleData
} from "./chunk-JYLXXKFF.js";
import {
  V
} from "./chunk-7NPEV2WA.js";
import {
  client_exports
} from "./chunk-ARMJJN7F.js";
import {
  computed,
  defineComponent,
  h
} from "./chunk-WLOKLJVF.js";

// gd-AccBuild-doc/.vuepress/.temp/theme-hope/socialMedia.js
var icons = { "Baidu": '<svg xmlns="http://www.w3.org/2000/svg" class="icon baidu-icon" viewBox="0 0 1024 1024" ariaLabelledby="baidu"><circle cx="512" cy="512" r="512" fill="#1D2FE3" />,<path d="M239.022 704.978c.098-4.865-.314-9.772.162-14.591 5.178-52.464 197.571-253.377 249.641-259.233 42.996-4.833 75.768 16.545 99.824 49.144 37.893 51.351 82.81 95.455 131.292 136.237 52.903 44.503 56.525 99.801 32.6 158.592-23.425 57.56-75.34 69.833-127.771 58.804-84.971-17.874-168.158-13.744-253.37-4.536-86.35 9.333-133.788-39.4-132.378-124.417zM352.464 412.86c-3.58 50.707-17.93 96.128-75.9 98.12-58.053 1.995-80.093-41.432-79.275-91.71.81-49.705 13.416-104.053 76.851-102.136 53.84 1.625 74.74 45.8 78.324 95.726zm386.053 142.168c-68.494-1.735-84.188-43.331-82.635-93.812 1.46-47.519 10.082-97.628 73.299-96.65 61.395.95 81.6 43.207 81.553 98.668-.047 53.156-19.818 89.398-72.217 91.794zm-45.235-278.345c-10.464 42.665-24.513 91.761-85.919 94.502-52.74 2.354-71.705-34.482-72.805-81.242-1.233-52.42 48.08-112.965 87.582-110.373 33.943 2.226 71.146 49.541 71.142 97.113zm-195.147-14.097c-7.005 46.274-13.63 100.025-71.562 101.351-57.077 1.306-73.567-47.922-73.638-97.109-.068-48.054 12.128-99.024 69.345-101.426 59.45-2.493 67.11 51.093 75.855 97.184z" fill="#fff" />,<path d="M479.52 663.165c.006 12.194 1.498 24.61-.284 36.537-4.707 31.503 18.862 78.749-45.326 77.534-54.226-1.027-103.338-3.31-113.231-73.536-7.164-50.852 7.78-85.674 57.687-102.668 17.67-6.016 39.618 5.058 54.096-14.548 10.84-14.679-2.901-54.592 33.418-41.47 24.075 8.7 11.477 38.922 13.278 59.652 1.68 19.366.359 38.99.363 58.5zm175.45 41.902c4.291 39.657 5.093 78.047-64.709 73.503-60.097-3.912-95.56-20.794-86.293-85.624 4.287-29.991-21.148-83.238 22.19-84.867 42.71-1.606 13.57 50.41 20.825 77.622 5.276 19.794-3.984 46.774 29.753 48.193 41.337 1.738 28.383-30.022 31.099-51.604 1.209-9.61-.85-19.65.528-29.215 2.516-17.474-8.928-44.716 19.554-47.191 36.044-3.133 24.155 28.376 26.678 47.523 1.896 14.387.375 29.225.375 51.66z" fill="#1D2FE3" />,<path d="M435.669 685.038c-2.255 24.07 5.605 53.68-33.623 52.136-34.594-1.362-35.274-31.818-38.513-53.078-4.028-26.448 11.38-48.18 40.785-50.023 40.967-2.564 27.097 30.764 31.35 50.965z" fill="#fff" /></svg>', "Bitbucket": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="bitbucket" class="icon bitbucket-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#205081"/>,<path fill="#fff" d="M512 191.32v.01-.01c-152.76 0-277.805 41.114-277.805 92.166 0 13.443 33.353 206.247 46.577 282.708 5.932 34.285 94.508 84.563 231.126 84.563l.102-.407v.407c137.484 0 225.26-50.278 231.192-84.578 13.23-76.457 46.592-269.255 46.592-282.698.005-51.047-125.024-92.165-277.784-92.165zm0 397.493c-48.771 0-88.31-39.545-88.31-88.31 0-48.772 39.539-88.306 88.31-88.306s88.31 39.534 88.31 88.31c0 48.766-39.539 88.306-88.31 88.306zm-.05-276.842c-98.256-.153-177.885-17.232-177.855-38.14.036-20.912 79.72-37.731 177.976-37.568 98.256.153 177.884 17.22 177.849 38.139-.026 20.908-79.705 37.716-177.966 37.564z"/>,<path fill="#fff" d="M711.668 642.814c-4.227 0-7.608 2.994-7.608 2.994S635.65 699.987 512 699.987s-192.06-54.18-192.06-54.18-3.386-2.988-7.608-2.988c-5.04 0-9.827 3.391-9.827 10.871 0 .79.076 1.579.224 2.353 10.617 56.826 18.382 97.206 19.736 103.347 9.268 41.805 91.045 73.411 189.525 73.411h.01c98.49 0 180.267-31.606 189.535-73.411 1.364-6.136 9.114-46.49 19.736-103.317.143-.779.224-1.578.224-2.368 0-7.485-4.786-10.881-9.827-10.881zM467.659 500.477a44.255 44.255 0 1 0 88.51 0 44.255 44.255 0 1 0-88.51 0z"/></svg>', "Dingding": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="dingding" class="icon dingding-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1C9DF7"/>,<path fill="#fff" d="M760.551 442.095c0 5.178-5.178 12.945-7.767 20.713-23.302 49.192-82.85 144.988-82.85 144.988l-18.124 31.069h85.44L576.727 853.758l36.247-144.988h-67.316l23.302-95.796c-18.124 5.178-41.426 10.356-67.316 18.124 0 0-36.247 20.712-100.974-38.837 0 0-44.015-38.836-18.124-49.192 10.356-5.178 54.37-10.356 88.029-12.945 44.014-5.179 72.494-10.357 72.494-10.357s-139.81 2.59-173.468-2.589c-33.658-5.178-75.083-59.549-82.85-108.741 0 0-12.946-25.89 28.48-12.945 44.013 12.945 222.66 49.192 222.66 49.192s-235.606-72.494-251.14-90.618c-15.535-18.123-46.604-95.796-41.426-144.988 0 0 2.59-12.945 12.945-7.767 0 0 173.469 80.261 292.566 121.686 119.098 41.426 222.66 64.727 209.715 119.098z"/></svg>', "Discord": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="discord" class="icon discord-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#2DAAE1"/>,<path fill="#fff" d="m422.935 240.147 5.851 8.052c-113.039 34.253-165.649 84.585-165.649 84.585s13.645-8.052 37.024-18.123c66.28-30.215 118.865-38.267 142.244-40.286 3.91 0 7.819-1.994 9.76-1.994 38.966-6.058 81.816-6.058 126.658-2.02 58.462 8.053 122.749 24.157 187.061 62.423 0 0-48.7-48.338-155.862-82.566l7.767-10.071h1.968c13.308.233 91.757 4.246 173.416 68.481 0 0 89.634 169.144 89.634 376.555 1.942-2.02-50.668 92.637-189.003 96.65 0 0-23.405-28.194-40.933-52.35 81.84-24.157 113.013-76.534 113.013-76.534a313.796 313.796 0 0 1-72.106 38.267c-31.172 14.11-60.403 22.162-89.633 28.22-60.404 12.066-114.955 8.027-161.74 0a636.81 636.81 0 0 1-91.576-28.22c-13.644-6.033-29.23-12.065-44.817-22.137-1.941-2.02-3.883-2.02-5.85-4.039-1.943 0-1.943-2.02-1.943-2.02-11.702-6.032-17.528-10.07-17.528-10.07s29.23 52.376 109.104 76.532c-19.47 24.157-40.907 54.371-40.907 54.371-138.36-4.039-190.97-98.67-190.97-98.67 0-207.41 89.633-376.555 89.633-376.555 89.634-70.5 175.384-68.481 175.384-68.481zm213.961 233.017c-35.315 0-64.727 34.512-64.727 77.672s29.412 77.672 64.727 77.672 64.727-34.512 64.727-77.672-29.412-77.672-64.727-77.672zm-233.016 0c-35.315 0-64.727 34.512-64.727 77.672s29.412 77.672 64.727 77.672 64.726-34.512 64.726-77.672-29.411-77.672-64.726-77.672z"/></svg>', "Dribbble": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="dribbble" class="icon dribbble-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#DC4373"/>,<path fill="#C13366" d="M716.668 302.752c-13.332 5.154-28.61 3.676-35.726-1.068-86.196-48.27-179.286-62.06-265.482-37.926C292.074 300.212 241.674 437.028 242 564.746c22.622 42.136 52.558 105.234 61.854 153.104l298.24 298.246c210.532-37.376 376.584-203.408 413.986-413.928L716.668 302.752z"/>,<path fill="#F0F1F1" d="M511.994 219.308c-161.592 0-293.058 131.31-293.058 292.696s131.466 292.684 293.058 292.684c161.598 0 293.07-131.292 293.07-292.684 0-161.386-131.472-292.696-293.07-292.696zm192.842 138.148c33.43 41.432 53.744 93.756 54.682 150.772-11.122-2.282-58.23-11.068-114.526-11.068-18.164 0-37.282.91-56.448 3.278a822.854 822.854 0 0 0-4.938-11.812c-4.972-11.692-10.326-23.29-15.874-34.72 86.642-35.696 128.436-85.238 137.104-96.45zm-192.842-92.33c62.446 0 119.528 23.2 163.126 61.412-6.902 9.416-44.332 56.202-127.876 87.768-38.67-70.688-80.996-129.22-91.07-142.812a247.13 247.13 0 0 1 55.82-6.368zm-106.352 23.99c8.536 11.758 50.928 70.918 90.592 141.036-106.448 27.982-200.976 29.806-223.79 29.806h-2.424c16.39-75.534 67.424-138.298 135.622-170.842zM264.402 512.39c0-2.038.034-4.076.1-6.102 1.48.018 3.666.018 6.5.018 30.726 0 137.382-2.538 247.288-35.154a828.402 828.402 0 0 1 18.928 39.526 232.24 232.24 0 0 0-8.234 2.482C405.236 553.126 337.216 658.936 326.75 676.232c-38.778-43.696-62.348-101.058-62.348-163.842zm247.592 247.246c-56.786 0-109.192-19.232-151.01-51.48 7.074-13.868 58.412-106.3 194.026-153.5a1.806 1.806 0 0 1 .272-.09c34.006 88.53 48.408 162.834 52.358 185.862-29.432 12.374-61.752 19.208-95.646 19.208zm140.236-43.584c-3.32-19.052-16.66-88.688-47.452-173.618 17.27-2.686 34.072-3.748 49.828-3.748 51.748 0 92.23 11.33 101.634 14.204-11.182 67.444-49.794 125.808-104.01 163.162z"/>,<path fill="#D1D1D1" d="M511.994 219.308c-.382 0-.758.028-1.142.028v45.804c.38 0 .758-.018 1.142-.018 62.446 0 119.528 23.2 163.126 61.412-6.902 9.416-44.332 56.202-127.876 87.768-12.14-22.194-24.642-43.188-36.392-61.968V473.29c2.476-.706 4.954-1.41 7.434-2.144a828.402 828.402 0 0 1 18.928 39.526c-2.776.796-5.514 1.592-8.234 2.478a323.314 323.314 0 0 0-18.128 6.52v53.228a418.976 418.976 0 0 1 44.428-18.332c34.006 88.53 48.408 162.834 52.358 185.862-29.428 12.374-61.746 19.208-95.646 19.208-.382 0-.758-.024-1.142-.024v45.05c.382 0 .758.028 1.142.028 161.598 0 293.07-131.292 293.07-292.684.002-161.388-131.47-292.698-293.068-292.698zm71.614 269.316c-4.972-11.692-10.326-23.29-15.874-34.72 86.64-35.696 128.434-85.236 137.102-96.45 33.43 41.432 53.748 93.756 54.682 150.77-11.122-2.282-58.23-11.068-114.522-11.068-18.164 0-37.282.914-56.448 3.278-1.624-3.932-3.24-7.852-4.94-11.81zm68.622 227.428c-3.32-19.052-16.66-88.688-47.452-173.618 17.27-2.686 34.072-3.748 49.828-3.748 51.748 0 92.23 11.33 101.634 14.204-11.182 67.444-49.794 125.808-104.01 163.162z"/></svg>', "Email": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="email" class="icon email-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1384FF"/>,<path fill="#fff" d="M299.372 313.572H722.93c28.945 0 52.61 21.845 52.975 48.787L511.333 500.35 246.76 362.481c.182-27.003 23.666-48.97 52.611-48.97zm-52.671 101.702l-.243 244.121c0 27.186 23.848 49.395 52.914 49.395H722.93c29.127 0 52.975-22.21 52.975-49.395V415.152L517.522 546.71a13.957 13.957 0 01-12.682 0L246.7 415.274z"/></svg>', "Evernote": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="evernote" class="icon evernote-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#36D613"/>,<path fill="#595757" d="M347.671 193.259v87.51h-87.51z"/>,<path fill="#595757" d="M788.047 323.645s3.65-77.491-73.84-103.02c0 0-89.479-12.867-151.41-11.91 0 0-8.595-53.23-103.33-53.23 0 0-89.556-1.244-89.892 70.526v61.671s2.848 14.991-27.833 14.991h-81.581s-34.28 5.282-34.28 72.934c0 0 3.133 120.082 41.322 200.24 0 0 9.398 34.667 58.228 46.577 0 0 95.822 25.477 123.991 21.722 0 0 58.228 22.137 62.008-111.874 0 0 3.755-19.935 6.266 11.392 0 0-1.89 68.948 57.607 72.702 0 0 45.723 12.557 73.892 10.045 0 0 37.568 2.15 37.568 64.158 0 0 13.152 71.665-34.435 71.665h-65.763s-18.149 4.428-18.149-21.877c0 0-4.997-21.878 26.305-21.878h15.534v-43.756h-43.082s-66.332-6.317-66.332 50.047v75.135s9.347 49.866 66.332 49.866h121.273s48.441.44 76.61-90.359c0-.078 48.52-182.323 22.991-435.767zM625.272 486.523c0-21.877 18.02-51.16 39.432-51.16s36.48 36.118 36.48 58.022c-28.79-7.897-45.827-9.606-75.912-6.862z"/></svg>', "Facebook": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="facebook" class="icon facebook-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#3C599B"/>,<path fill="#fff" d="M372.568 413.895h59.898V355.68c0-25.67.647-65.257 19.294-89.774 19.642-25.965 46.605-43.613 92.983-43.613 75.565 0 107.384 10.778 107.384 10.778l-14.971 88.74s-24.967-7.217-48.254-7.217c-23.302 0-44.16 8.35-44.16 31.635v67.666h95.526l-6.67 86.678h-88.855V801.69H432.466V500.574h-59.898v-86.68z"/></svg>', "Flipboard": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="flipboard" class="icon flipboard-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#E12828"/>,<path fill="#fff" d="M293.58 292.18h160.343v481.003H293.58V292.18z"/>,<path fill="#FCE9E9" d="M453.922 292.18h320.662v160.343H453.922V292.18z"/>,<path fill="#F6BEBE" d="M453.922 452.523h160.343v160.343H453.922V452.523z"/></svg>', "Gitee": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="gitee" class="icon gitee-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#C71D23"/>,<path fill="#fff" d="M772.953 454.723H480.17v.006a25.46 25.46 0 0 0-25.46 25.453l-.025 63.649a25.46 25.46 0 0 0 25.46 25.466l178.242-.007a25.46 25.46 0 0 1 25.459 25.46v12.73c0 42.18-34.198 76.378-76.378 76.378H365.583a25.46 25.46 0 0 1-25.46-25.46V416.533h-.006c0-42.18 34.192-76.378 76.378-76.378h356.388v-.013a25.46 25.46 0 0 0 25.46-25.446l.057-63.65h.013a25.46 25.46 0 0 0-25.46-25.471l-356.432.012c-105.453 0-190.946 85.493-190.946 190.946v356.433a25.46 25.46 0 0 0 25.46 25.46H626.56c94.913 0 171.852-76.94 171.852-171.852V480.182a25.46 25.46 0 0 0-25.46-25.46z"/></svg>', "GitHub": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="github" class="icon github-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#171515"/>,<path fill="#fff" d="M509.423 146.442c-200.317 0-362.756 162.42-362.756 362.8 0 160.266 103.936 296.24 248.109 344.217 18.139 3.327 24.76-7.872 24.76-17.486 0-8.613-.313-31.427-.49-61.702-100.912 21.923-122.205-48.63-122.205-48.63-16.495-41.91-40.28-53.067-40.28-53.067-32.937-22.51 2.492-22.053 2.492-22.053 36.407 2.566 55.568 37.386 55.568 37.386 32.362 55.438 84.907 39.43 105.58 30.143 3.296-23.444 12.667-39.43 23.032-48.498-80.557-9.156-165.246-40.28-165.246-179.297 0-39.604 14.135-71.988 37.342-97.348-3.731-9.178-16.18-46.063 3.556-96.009 0 0 30.46-9.754 99.76 37.19 28.937-8.048 59.97-12.071 90.823-12.211 30.807.14 61.843 4.165 90.822 12.21 69.26-46.944 99.663-37.189 99.663-37.189 19.792 49.946 7.34 86.831 3.61 96.01 23.25 25.359 37.29 57.742 37.29 97.347 0 139.366-84.82 170.033-165.637 179.013 13.026 11.2 24.628 33.342 24.628 67.182 0 48.498-.445 87.627-.445 99.521 0 9.702 6.535 20.988 24.945 17.444 144.03-48.067 247.881-183.95 247.881-344.175 0-200.378-162.442-362.798-362.802-362.798z"/></svg>', "Gitlab": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="gitlab" class="icon gitlab-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#E8F0FF"/>,<path fill="#E24329" d="m512 848.182 134.473-413.8H377.527L512 848.182z"/>,<path fill="#FC6D26" d="m512 848.182-134.473-413.8h-188.36L512 848.182z"/>,<path fill="#E24329" d="M189.167 434.382h188.36l-80.832-249.17c-4.202-12.854-22.247-12.854-26.45 0l-81.078 249.17z"/>,<path fill="#FC6D26" d="m512 848.182 134.473-413.8h188.36L512 848.182z"/>,<path fill="#FCA326" d="m834.833 434.382 40.787 125.82a27.8 27.8 0 0 1-10.135 31.147L512 848.182l322.833-413.8z"/>,<path fill="#E24329" d="M834.833 434.382h-188.36l81.079-249.17c4.202-12.854 22.247-12.854 26.45 0l80.831 249.17z"/></svg>', "Gmail": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="gmail" class="icon gmail-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#DB4437"/>,<path fill="#E67C73" d="M277.48 285.567h465.767v441.362H277.48V285.567z"/>,<path fill="#FFF" d="M282.543 285.567h-10.645c-25.962 0-47.122 21.808-47.122 48.705v343.952c0 26.897 21.08 48.705 47.122 48.705h24.976V407.954l213.49 169.95 213.489-169.95V726.93h24.975c26.04 0 47.123-21.809 47.123-48.705V334.272c0-26.897-21.134-48.705-47.123-48.705h-10.644L510.364 480.44 282.542 285.567z"/></svg>', "Instagram": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="instagram" class="icon instagram-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#181818"/>,<path fill="#fff" d="M512 348.16c-88.222 0-163.84 71.417-163.84 163.84 0 88.222 71.417 163.84 163.84 163.84 88.222 0 163.84-71.417 163.84-163.84 0-88.222-75.618-163.84-163.84-163.84zm0 268.866c-58.814 0-105.026-46.212-105.026-105.026S453.186 406.974 512 406.974 617.026 453.186 617.026 512 570.814 617.026 512 617.026zM680.041 306.15c-21.005 0-37.81 16.804-37.81 37.809s16.805 37.81 37.81 37.81 37.81-16.805 37.81-37.81-16.805-37.81-37.81-37.81z"/>,<path fill="#FFF" d="M659.036 196.923h-16.804c-50.413-4.2-210.051-4.2-260.464 0-96.623-4.2-180.644 71.418-184.845 168.041v16.804c-4.2 50.413-4.2 210.051 0 260.464-4.2 96.623 71.418 180.644 168.041 184.845h16.804c50.413 4.2 210.051 4.2 260.464 0 96.623 4.2 180.644-71.418 184.845-168.041V381.768c4.2-96.623-71.418-180.644-168.041-184.845zM759.86 696.845c-12.604 29.407-33.609 50.412-58.815 58.814-121.83 16.805-247.86 16.805-373.891 0-29.407-12.603-50.412-33.608-58.814-58.814-12.604-63.015-16.805-126.03-12.604-184.845-4.2-63.015 0-126.03 12.604-184.845 12.603-29.407 33.608-50.412 58.814-58.814 121.83-16.805 247.86-16.805 373.891 0 29.407 12.603 50.412 33.608 58.815 58.814 12.603 63.015 16.804 126.03 12.603 184.845 4.2 63.015 0 126.03-12.603 184.845z"/></svg>', "Lines": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="lines" class="icon lines-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#00C300"/>,<path fill="#fff" d="M861.44 469.76C861.44 313.28 704 186.08 512 186.08s-349.44 127.2-349.44 283.68C162.56 608 286.88 727.52 454.88 752c11.52 2.4 26.88 7.68 30.72 17.28a71.04 71.04 0 0 1 0 31.68l-5.28 29.76c0 8.64-7.2 34.56 30.24 18.72a1104 1104 0 0 0 274.56-202.56A251.52 251.52 0 0 0 860 472.16zM375.2 562.88h-69.12a17.76 17.76 0 0 1-18.24-18.24v-139.2a17.76 17.76 0 0 1 18.24-18.24 18.24 18.24 0 0 1 18.24 18.24v120.48h50.88a18.72 18.72 0 0 1 18.24 18.72 18.24 18.24 0 0 1-18.24 18.24zm72-18.24a18.24 18.24 0 1 1-36.48 0v-139.2a18.24 18.24 0 0 1 36.48 0zm167.04 0a18.24 18.24 0 0 1-12.48 17.28H596a18.24 18.24 0 0 1-14.4-7.2l-69.6-96v85.92a18.24 18.24 0 1 1-36.48 0v-139.2A18.24 18.24 0 0 1 488 388.16h5.76a18.24 18.24 0 0 1 14.4 7.2l71.52 96v-85.92a18.24 18.24 0 1 1 36.48 0zm112.32-87.84a18.24 18.24 0 0 1 18.24 18.24 17.76 17.76 0 0 1-18.24 18.24h-50.88v32.64h50.88a18.72 18.72 0 0 1 18.24 18.72 18.24 18.24 0 0 1-18.24 18.24H656a18.24 18.24 0 0 1-18.24-18.24v-139.2A18.24 18.24 0 0 1 656 387.2h69.12a18.24 18.24 0 0 1 18.24 18.24 18.24 18.24 0 0 1-18.24 18.72h-49.44v32.64zm0 0"/></svg>', "Linkedin": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="linkedin" class="icon linkedin-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#4376B1"/>,<path fill="#F1F2F2" d="M838.301 555.94v225.157h-130.54V571.03c0-52.746-18.847-88.766-66.112-88.766-36.069 0-57.496 24.25-66.959 47.732-3.436 8.391-4.322 20.045-4.322 31.814v219.277h-130.55s1.752-355.784 0-392.613h130.56v55.637c-.263.438-.633.867-.867 1.285h.866v-1.285c17.349-26.694 48.287-64.856 117.651-64.856 85.884 0 150.273 56.114 150.273 176.685zm-535.05-356.72c-44.655 0-73.87 29.314-73.87 67.826 0 37.695 28.368 67.855 72.157 67.855h.847c45.532 0 73.842-30.16 73.842-67.855-.866-38.512-28.31-67.825-72.975-67.825zM237.14 781.098h130.5V388.474h-130.5v392.623z"/></svg>', "Pinterest": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="pinterest" class="icon pinterest-icon" viewBox="0 0 1024 1024"><path fill="#fff" d="M512 1023.147c282.773 0 512-228.288 512-509.888 0-281.622-229.227-509.91-512-509.91S0 231.637 0 513.26c0 281.6 229.227 509.888 512 509.888z"/>,<path fill="#CA242D" d="M512 3.35C229.248 3.35 0 231.658 0 513.258c0 216.128 134.848 400.789 325.312 475.05-4.63-40.277-8.427-102.378 1.685-146.453 9.28-39.872 59.84-253.483 59.84-253.483s-15.168-30.634-15.168-75.541c0-70.933 41.302-123.797 92.715-123.797 43.819 0 64.896 32.725 64.896 71.765 0 43.627-27.819 109.099-42.56 169.963-12.224 50.773 25.707 92.33 75.84 92.33 91.03 0 160.981-95.68 160.981-233.344 0-122.133-88.064-207.317-214.058-207.317-145.814 0-231.36 108.693-231.36 221.163 0 43.648 16.853 90.645 37.93 116.245a15.19 15.19 0 0 1 3.371 14.699c-3.797 15.936-12.65 50.773-14.336 57.92-2.09 9.216-7.573 11.328-17.28 6.698-64.043-29.781-104.085-122.538-104.085-197.653 0-160.747 117.162-308.459 338.389-308.459 177.408 0 315.627 125.888 315.627 294.614 0 175.829-111.254 317.269-265.472 317.269-51.84 0-100.715-26.859-117.163-58.752l-32.021 121.28c-11.371 44.48-42.56 99.883-63.638 133.867A516.01 516.01 0 0 0 511.168 1024c282.752 0 512-228.31 512-509.91C1024 231.66 794.752 3.35 512 3.35z"/></svg>', "Pocket": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="pocket" class="icon pocket-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#EE4056"/>,<path fill="#fff" d="M716.52 309.066c12.549 0 23.172 4.394 31.87 13.182 8.697 8.788 13.023 19.48 13.023 32.006v150.4c0 33.975-6.568 66.41-19.705 97.307-13.138 30.918-30.76 57.487-52.89 79.685-22.106 22.197-48.562 39.864-79.367 52.888-30.804 13.024-63.081 19.547-96.876 19.547a246.897 246.897 0 0 1-97.215-19.547c-30.805-13.046-57.306-30.668-79.504-52.888-22.198-22.198-39.865-48.767-53.003-79.663a246.311 246.311 0 0 1-19.728-97.33V354.255c0-12.321 4.44-22.945 13.319-31.847a43.489 43.489 0 0 1 31.87-13.341H716.52zM512.574 617.339c9.06 0 16.989-3.216 23.738-9.581l117.103-112.415a32.622 32.622 0 0 0 10.691-24.62c0-9.469-3.33-17.533-9.966-24.191a32.958 32.958 0 0 0-24.237-10.012c-9.06 0-16.988 3.171-23.737 9.56l-93.547 89.808-93.614-89.809a33.185 33.185 0 0 0-23.443-9.559c-9.468 0-17.532 3.33-24.19 9.967-6.66 6.682-9.967 14.722-9.967 24.236 0 9.83 3.443 18.03 10.419 24.599l117.33 112.413c6.342 6.342 14.179 9.56 23.466 9.56l-.046.044z"/></svg>', "QQ": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="qq" class="icon qq-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#5EAADE"/>,<path fill="#fff" d="M729.46 627.3c-3.157-39.628-24.045-83.747-32.624-105.91l-22.084-57.047c-.702-23.73 6.312-78.322-30.511-146.61s-110.82-74.446-124.497-75.147c-13.677-.701-99.248-1.403-141.331 72.945-42.084 74.347-30.745 148.812-30.745 148.812l-23.523 57.478c-.001.002-10.962 26.223-20.43 58.135-9.469 31.914-18.938 82.064-9.469 92.234 9.47 10.17 43.837-46.643 46.993-51.903 0 0 2.456 27.18 8.943 41.383l.81 1.776.33.723.38.826.3.652.444.96.203.436a281.465 281.465 0 0 0 1.917 4.025l.189.386c.231.473.468.953.711 1.442l.146.292c6.886 13.807 18.61 33.823 37.443 50.42l.018.016-1.184.387c-10.667 3.516-31.694 11.21-40.625 19.82-1.717 1.655-2.987 3.344-3.65 5.045-5.376 13.794 4.208 15.43 20.575 16.366 16.366.934 94.923 3.04 132.564-2.221.407-.056.787-.114 1.17-.171 2.711.094 5.324.142 7.83.16l.151.002c.836.005 1.663.008 2.475.008.496 0 1.015-.002 1.542-.006l.21-.001a222.593 222.593 0 0 0 5.462-.107c.26.038.508.076.778.114 37.642 5.26 116.198 3.156 132.564 2.22 16.366-.934 25.951-2.571 20.574-16.365-4.302-11.037-34.175-21.62-45.956-25.413a141.388 141.388 0 0 0 7.958-7.645l.237-.245a142.494 142.494 0 0 0 2.53-2.702c42.435-46.643 38.928-76.101 40.682-92.935 0 0 35.775 51.553 43.488 53.306 7.713 1.754 10.169-6.31 7.012-45.94z"/></svg>', "Qzone": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="qzone" class="icon qzone-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#0985DD"/>,<path fill="#fff" d="M722.38 595.24c22.486-4.056 11.345-12.424 2.156-11.346-16.685 1.72-40.43 1.925-66.562 1.284l3.029 17.79a656.641 656.641 0 0 0 61.402-7.702l-.025-.026zm68.95-174.915a5.287 5.287 0 0 0-4.493-3.645L598.42 389.29l-84.326-170.628c-1.925-3.594-7.958-3.594-9.857 0L419.885 389.29l-188.417 27.39a5.338 5.338 0 0 0-4.466 3.645 5.493 5.493 0 0 0 1.488 5.57l136.36 132.92-32.088 187.519a5.263 5.263 0 0 0 2.13 5.39c1.695 1.284 3.851 1.463 5.776.385l168.651-88.407 168.524 88.638 2.567.642 3.209-1.079c1.72-1.283 2.566-3.208 2.13-5.34l-24.591-143.648c-27.21 2.156-54.37 3.183-76.42 3.183-77.267 0-135.075-3.645-135.948-3.645a16.48 16.48 0 0 1-14.785-11.757 16.247 16.247 0 0 1 5.981-17.764l155.431-113.05c-99.959-7.906-183.873-6.418-184.721-6.418-13.502.642-25.67-3.645.642-14.375 4.518-1.694 109.2-23.72 230.362-7.445 6.673.847 12.013 5.75 13.733 12.194a16.61 16.61 0 0 1-6.263 17.302L497.204 571.598c27.826 5.802 100.37 12.014 160.745 13.502l-4.519-26.312 136.308-132.97a5.338 5.338 0 0 0 1.54-5.544l.051.051z"/></svg>', "Reddit": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="reddit" class="icon reddit-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#EB5528"/>,<path fill="#fff" d="M617.199 680.55c5.666 5.974 5.666 11.742 0 17.34-21.845 23.143-56.9 34.714-105.199 34.714s-83.354-11.571-105.199-34.714c-5.666-5.598-5.666-11.366 0-17.34a10.445 10.445 0 0 1 7.919-3.379c3.174 0 5.803 1.127 7.919 3.38 16.93 18.295 46.728 27.408 89.361 27.408 42.325 0 72.09-9.113 89.361-27.409a10.445 10.445 0 0 1 7.919-3.379c3.174 0 5.803 1.127 7.919 3.38zm-176.06-136.635c9.182 9.694 13.756 21.47 13.756 35.294 0 13.79-4.574 25.565-13.756 35.26a44.134 44.134 0 0 1-33.28 14.54c-13.073 0-24.234-4.847-33.587-14.54a49.015 49.015 0 0 1-13.995-35.26c0-14.2 4.642-26.147 13.995-35.84 9.353-9.728 20.514-14.575 33.587-14.575 13.04 0 24.132 5.051 33.28 15.12zm222.584 35.294c0 13.79-4.642 25.565-13.995 35.26a44.954 44.954 0 0 1-33.587 14.54c-13.04 0-24.132-4.847-33.28-14.54a49.493 49.493 0 0 1-13.756-35.26c0-13.824 4.574-25.669 13.756-35.567 9.148-9.9 20.24-14.848 33.28-14.848 13.073 0 24.234 4.847 33.587 14.575 9.353 9.693 13.995 21.64 13.995 35.84zM796.433 512c0-18.295-6.144-33.963-18.5-47.036a59.494 59.494 0 0 0-44.92-19.592c-17.647 0-32.768 6.724-45.465 20.138-45.841-33.587-100.66-51.507-164.455-53.725l33.314-158.482 105.746 25.19c0 13.825 4.573 25.6 13.755 35.295 9.148 9.694 20.241 14.54 33.314 14.54 13.04 0 24.235-4.915 33.553-14.813 9.353-9.899 13.995-21.743 13.995-35.567s-4.642-25.669-13.995-35.567a44.578 44.578 0 0 0-33.553-14.814c-19.046 0-33.143 9.318-42.325 27.99L550.06 228.112c-6.69-1.877-11.094 1.126-13.21 8.977l-36.488 174.695c-63.454 2.594-117.897 20.718-163.363 54.272a59.187 59.187 0 0 0-46.011-20.685c-17.613 0-32.598 6.52-44.92 19.592a66.082 66.082 0 0 0-18.5 47.036c0 13.073 3.243 25.02 9.762 35.84 6.52 10.82 15.258 19.046 26.18 24.644a152.303 152.303 0 0 0-3.174 31.335c0 53.009 24.678 98.372 74.035 136.09 49.323 37.682 108.715 56.524 178.176 56.524 69.769 0 129.365-18.842 178.688-56.525 49.357-37.717 74.001-83.08 74.001-136.09 0-11.946-1.229-22.561-3.686-31.914 10.581-5.598 19.046-13.722 25.395-24.337 6.315-10.65 9.49-22.528 9.49-35.567z"/></svg>', "Rss": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="rss" class="icon rss-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#FD9B00"/>,<path fill="#fff" d="M687.981 740.39c0-225.92-183.617-409.777-409.21-409.777v-97.205c279.353 0 506.617 227.506 506.617 506.98H687.98zm-74.841 0h-97.538c0-63.567-24.688-123.245-69.43-167.993-44.762-44.856-104.24-69.556-167.54-69.556v-97.176c184.44 0 334.508 150.046 334.508 334.725zM346.038 605.166c37.35 0 67.514 30.357 67.514 67.39 0 37.146-30.163 67.177-67.514 67.177-37.219 0-67.458-30.03-67.458-67.176 0-37.034 30.24-67.391 67.458-67.391z"/></svg>', "Steam": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="steam" class="icon steam-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="488" fill="#fff"/>,<path fill="#13227a" d="M1008 512c0 274-222.4 496-496.8 496-227.6 0-419.2-152.6-478-360.8l190.4 78.6c12.8 64.2 69.8 112.8 137.8 112.8 78.4 0 143.8-64.8 140.4-147l169-120.4c104.2 2.6 191.6-81.8 191.6-187 0-103.2-84-187-187.4-187s-187.4 84-187.4 187v2.4L369.2 558c-31-1.8-61.4 6.8-87 24.2L16 472.2C36.4 216.8 250.2 16 511.2 16 785.6 16 1008 238 1008 512zM327.4 768.6l-61-25.2a105.58 105.58 0 0 0 54.4 51.6c53.8 22.4 115.6-3.2 138-56.8 10.8-26 11-54.6.2-80.6-10.8-26-31-46.4-57-57.2-25.8-10.8-53.4-10.4-77.8-1.2l63 26c39.6 16.4 58.4 61.8 41.8 101.4-16.6 39.8-62 58.4-101.6 42zM675 508.8c-68.8 0-124.8-56-124.8-124.6s56-124.6 124.8-124.6 124.8 56 124.8 124.6S744 508.8 675 508.8zm.2-31.2c51.8 0 93.8-42 93.8-93.6 0-51.8-42-93.6-93.8-93.6s-93.8 42-93.8 93.6c.2 51.6 42.2 93.6 93.8 93.6z"/></svg>', "Twitter": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="twitter" class="icon twitter-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#5EAADE"/>,<path fill="#fff" d="M749.737 364.631c-17.594 7.805-36.513 13.088-56.371 15.459 20.269-12.148 35.836-31.387 43.156-54.312A196.233 196.233 0 0 1 674.2 349.6c-17.894-19.083-43.406-30.997-71.636-30.997-54.2 0-98.137 43.944-98.137 98.157 0 7.695.861 15.19 2.544 22.373-81.57-4.092-153.876-43.174-202.284-102.558-8.443 14.498-13.285 31.356-13.285 49.348 0 34.05 17.326 64.096 43.656 81.697a97.69 97.69 0 0 1-44.447-12.277c-.01.41-.01.82-.01 1.24 0 47.558 33.822 87.23 78.72 96.249a98.285 98.285 0 0 1-25.852 3.448 97.491 97.491 0 0 1-18.465-1.768c12.483 39.002 48.725 67.38 91.672 68.17-33.582 26.334-75.897 42.024-121.884 42.024-7.924 0-15.736-.46-23.408-1.37 43.434 27.844 95.014 44.104 150.443 44.104 180.505 0 279.221-149.576 279.221-279.294 0-4.263-.09-8.494-.278-12.708 19.178-13.835 35.813-31.115 48.967-50.807z"/></svg>', "Wechat": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="wechat" class="icon wechat-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#1AC88E"/>,<path fill="#fff" d="M827.551 578.742a176.583 176.583 0 0 0-185.685-158.379 172.942 172.942 0 0 0-186.3 158.379 172.942 172.942 0 0 0 185.686 158.379 282.169 282.169 0 0 0 65.536-10.923l60.689 32.768-16.384-54.613a166.275 166.275 0 0 0 76.458-125.611zm-245.76-27.307a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.307 21.845 24.872 24.872 0 0 1-27.921 21.845h.614zm121.356 0a21.845 21.845 0 1 1 0-43.69 24.872 24.872 0 0 1 27.306 21.845 24.872 24.872 0 0 1-28.512 21.845h1.206z"/>,<path fill="#fff" d="M623.662 400.953h21.23A222.709 222.709 0 0 0 419.772 245.6a208.145 208.145 0 0 0-223.323 189.94 182.044 182.044 0 0 0 89.201 150.483l-22.436 67.356 78.279-39.435a389.575 389.575 0 0 0 78.279 10.923h20.616a163.226 163.226 0 0 1-6.667-46.718 182.044 182.044 0 0 1 189.94-177.197zm-121.379-60.69a27.921 27.921 0 1 1 0 55.843 31.562 31.562 0 0 1-33.36-27.921 31.562 31.562 0 0 1 34.59-27.921h-1.23zM346.34 396.107a31.562 31.562 0 0 1-33.383-27.921 31.562 31.562 0 0 1 33.383-27.921 27.921 27.921 0 1 1 0 55.842z"/></svg>', "Weibo": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="weibo" class="icon weibo-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#E6162D"/>,<path fill="#fff" d="M745.314 454.802c9.652 0 17.869-7.258 19.239-16.728a8.39 8.39 0 0 0 .261-2.12C779.445 302.233 657.02 325.25 657.02 325.25c-10.869 0-19.567 8.94-19.567 20.089 0 10.97 8.698 19.907 19.567 19.907 87.95-19.732 68.54 69.649 68.54 69.649-.004 11.06 8.842 19.908 19.754 19.908z"/>,<path fill="#fff" d="M731.054 221.409c-42.342-10.077-85.862-1.393-98.055.981-.938.09-1.829.994-2.697 1.17-.415.088-.673.532-.673.532-12.045 3.457-20.828 14.77-20.828 28.14 0 15.932 12.694 29.034 28.564 29.034 0 0 15.39-2.097 25.846-6.252 10.364-4.246 98.012-3.16 141.576 71.17 23.734 54.247 10.428 90.553 8.778 96.387 0 0-5.653 14.095-5.653 27.973 0 16.024 12.694 26.083 28.433 26.083 13.169 0 24.211-1.821 27.452-24.447h.172c46.768-158.386-57.183-232.81-132.915-250.771zm-44.083 282.78c-28.28-5.579-14.519-21.062-14.519-21.062s27.67-46.38-5.482-80.099c-41.104-41.761-140.966 5.314-140.966 5.314-38.144 12.032-28.02-5.49-22.629-35.31 0-35.13-11.844-94.596-113.445-59.47-101.49 35.309-188.654 159.03-188.654 159.03-60.603 82.207-52.56 145.747-52.56 145.747 15.128 140.268 161.749 178.772 275.782 187.89 119.967 9.564 281.905-42.045 330.988-148.064 49.105-106.193-40.126-148.22-68.515-153.975zM433.387 766.675c-119.124 5.658-215.394-55.053-215.394-135.851 0-80.887 96.27-145.748 215.394-151.328 119.162-5.58 215.634 44.333 215.634 125.052.002 80.79-96.475 156.626-215.634 162.127z"/>,<path fill="#fff" d="M409.603 532.773c-119.77 14.249-105.943 128.31-105.943 128.31s-1.22 36.117 32.126 54.513c70.084 38.593 142.248 15.224 178.723-32.634 36.474-47.888 15.086-164.346-104.906-150.189zM379.39 692.856c-22.343 2.665-40.385-10.437-40.385-29.463 0-18.94 16.02-38.768 38.387-41.143 25.694-2.485 42.431 12.56 42.431 31.588-.003 18.936-18.128 36.449-40.433 39.018zm70.626-61.146c-7.59 5.754-16.893 4.958-20.892-1.948-4.175-6.726-2.607-17.52 5.046-23.19 8.863-6.714 18.105-4.779 22.106 1.958 4.02 6.893 1.153 17.246-6.26 23.18z"/></svg>', "Whatsapp": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="whatsapp" class="icon whatsapp-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#31B84C"/>,<path fill="#fff" d="m192.021 832 45.227-164.33a315.413 315.413 0 0 1-42.539-158.529C194.731 334.251 337.707 192 513.344 192c84.587-.213 165.76 33.28 225.387 93.013A314.453 314.453 0 0 1 832 509.376c-.085 174.848-143.04 317.141-318.656 317.141h-.15a319.61 319.61 0 0 1-152.277-38.613L192 832h.021zm241.686-455.467c-6.443-15.445-13.014-13.354-17.92-13.61-4.63-.214-9.942-.256-15.254-.256a29.227 29.227 0 0 0-21.226 9.898c-7.296 7.958-27.84 27.136-27.84 66.134s28.501 76.672 32.49 81.962c3.968 5.291 56.15 85.334 136 119.638 19.008 8.17 33.814 13.056 45.398 16.704 19.072 6.037 36.437 5.184 50.133 3.157 15.296-2.283 47.125-19.2 53.76-37.675 6.613-18.56 6.613-34.389 4.65-37.717-1.983-3.264-7.295-5.27-15.274-9.237-7.957-3.947-47.125-23.126-54.4-25.771-7.296-2.667-12.587-3.968-17.92 3.947-5.312 7.936-20.565 25.792-25.195 31.061-4.65 5.312-9.301 5.973-17.258 2.005-7.979-3.968-33.622-12.33-64-39.338-23.68-20.992-39.68-46.955-44.331-54.912-4.65-7.915-.47-12.203 3.52-16.15 3.563-3.541 7.936-9.258 11.904-13.866 3.99-4.651 5.333-7.958 7.979-13.227 2.645-5.29 1.322-9.92-.64-13.888-2.006-3.968-17.92-42.987-24.555-58.859h-.021z"/></svg>', "Youtube": '<svg xmlns="http://www.w3.org/2000/svg" class="icon youtube-icon" viewBox="0 0 1024 1024" ariaLabelledby="youtube"><circle cx="512" cy="512" r="512" fill="#DD1829" />,<path d="M800.305 372.2c-12.805-42.429-22.873-65.942-65.303-71.064 0 0-113.644-5.761-226.64-5.761-111.716 0-222.797 5.761-222.797 5.761-44.992 5.122-55.7 29.915-67.223 71.065 0 0-11.524 65.527-11.524 131.886 0 68.066 11.524 137.008 11.524 137.008 8.963 39.87 27.354 65.943 67.223 71.065 0 0 123.292 7.682 240.724 7.682 106.78 0 208.714-7.682 208.714-7.682 39.87-7.682 53.78-28.635 65.303-71.065 0 0 11.523-63.022 11.523-128.045 0-69.288-11.524-140.85-11.524-140.85zM448.82 619.97V393.33l174.781 113.32L448.82 619.97z" fill="#fff" /></svg>', "Zhihu": '<svg xmlns="http://www.w3.org/2000/svg" ariaLabelledby="zhihu" class="icon zhihu-icon" viewBox="0 0 1024 1024"><circle cx="512" cy="512" r="512" fill="#006CE2"/>,<path fill="#fff" d="M513.65 491.261H411.551c1.615-16.154 5.815-60.095 5.815-84.973 0-24.88-.323-60.742-.323-60.742h102.744V329.39c0-21.647-9.37-31.34-17.124-31.34h-178.67s5.169-17.77 10.015-36.186c4.846-18.417 15.832-44.264 15.832-44.264-63.003 4.2-67.958 50.941-81.743 92.729-13.787 41.785-24.556 62.356-44.586 107.912 27.786 0 55.249-13.57 66.879-32.309 11.631-18.74 16.908-40.71 16.908-40.71h62.035v59.019c0 21.107-3.878 87.45-3.878 87.45H254.742c-19.386 0-29.724 48.894-29.724 48.894h133.76c-8.4 75.82-26.493 106.191-51.91 152.716-25.418 46.525-92.728 99.406-92.728 99.406 41.033 11.63 86.589-3.555 105.974-21.972 19.386-18.417 35.863-49.756 47.817-72.838 11.954-23.081 21.972-65.124 21.972-65.124L498.462 766.86s4.846-24.233 6.461-39.418c1.616-15.186-.755-26.385-4.63-35.433-3.878-9.046-15.509-21.54-31.018-39.634-15.507-18.094-48.034-52.879-48.034-52.879s-15.832 11.63-28.108 21.001c9.046-21.97 16.262-79.695 16.262-79.695h122.343v-20.249c.003-17.66-7.319-29.29-18.089-29.29zm287.337-200.747h-234.35a4.308 4.308 0 0 0-4.309 4.308v435.099a4.308 4.308 0 0 0 4.308 4.308h40.226l14.7 50.402 81.096-50.402h98.328a4.308 4.308 0 0 0 4.308-4.308v-435.1a4.308 4.308 0 0 0-4.308-4.308zM755.97 684.47h-52.343l-61.548 39.095-10.823-39.095h-18.738V338.116H755.97v346.355z"/></svg>' };

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/SocialMedia.js
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/social-media.scss";
var SocialMedia_default = defineComponent({
  name: "SocialMedia",
  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();
    const mediaLinks = computed(() => {
      const config = blogOptions.value.medias;
      if (config)
        return Object.entries(config).map(([media, url]) => ({
          name: media,
          icon: icons[media],
          url
        }));
      return [];
    });
    return () => mediaLinks.value.length ? h("div", { class: "social-media-wrapper" }, mediaLinks.value.map(({ name, icon, url }) => h("a", {
      class: "social-media",
      href: url,
      rel: "noopener noreferrer",
      target: "_blank",
      "aria-label": name,
      ...isPure.value ? {} : { "data-balloon-pos": "up" },
      innerHTML: icon
    }))) : null;
  }
});

// node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/modules/blog/components/BloggerInfo.js
import "F:/MyWorkSpace_program/lowcode-nocode/\u6587\u6863/gd-AccBuild-doc/node_modules/.pnpm/vuepress-theme-hope@2.0.0-beta.97/node_modules/vuepress-theme-hope/lib/client/modules/blog/styles/blogger-info.scss";
var BloggerInfo_default = defineComponent({
  name: "BloggerInfo",
  setup() {
    const blogOptions = useBlogOptions();
    const siteLocale = (0, client_exports.useSiteLocaleData)();
    const themeLocale = useThemeLocaleData();
    const articles = useArticles();
    const categoryMap = useCategoryMap();
    const tagMap = useTagMap();
    const timelines = useTimelines();
    const navigate = useNavigate();
    const bloggerName = computed(() => {
      var _a;
      return blogOptions.value.name || ((_a = V(themeLocale.value.author)[0]) == null ? void 0 : _a.name) || siteLocale.value.title;
    });
    const bloggerAvatar = computed(() => blogOptions.value.avatar || themeLocale.value.logo);
    const locale = computed(() => themeLocale.value.blogLocales);
    const intro = computed(() => blogOptions.value.intro);
    return () => h("div", {
      class: "blogger-info",
      vocab: "https://schema.org/",
      typeof: "Person"
    }, [
      h("div", {
        class: "blogger",
        ...intro.value ? {
          style: { cursor: "pointer" },
          "aria-label": locale.value.intro,
          "data-balloon-pos": "down",
          role: "navigation",
          onClick: () => navigate(intro.value)
        } : {}
      }, [
        bloggerAvatar.value ? h("img", {
          class: [
            "blogger-avatar",
            {
              round: blogOptions.value.roundAvatar
            }
          ],
          src: (0, client_exports.withBase)(bloggerAvatar.value),
          property: "image",
          alt: "Blogger Avatar"
        }) : null,
        bloggerName.value ? h("div", { class: "blogger-name", property: "name" }, bloggerName.value) : null,
        blogOptions.value.description ? h("div", {
          class: "blogger-description",
          innerHTML: blogOptions.value.description
        }) : null,
        intro.value ? h("meta", { property: "url", content: (0, client_exports.withBase)(intro.value) }) : null
      ]),
      h("div", { class: "num-wrapper" }, [
        h("div", { onClick: () => navigate(articles.value.path) }, [
          h("div", { class: "num" }, articles.value.items.length),
          h("div", locale.value.article)
        ]),
        h("div", { onClick: () => navigate(categoryMap.value.path) }, [
          h("div", { class: "num" }, Object.keys(categoryMap.value.map).length),
          h("div", locale.value.category)
        ]),
        h("div", { onClick: () => navigate(tagMap.value.path) }, [
          h("div", { class: "num" }, Object.keys(tagMap.value.map).length),
          h("div", locale.value.tag)
        ]),
        h("div", { onClick: () => navigate(timelines.value.path) }, [
          h("div", { class: "num" }, timelines.value.items.length),
          h("div", locale.value.timeline)
        ])
      ]),
      h(SocialMedia_default)
    ]);
  }
});

export {
  BloggerInfo_default
};
//# sourceMappingURL=chunk-7GHFRGGE.js.map

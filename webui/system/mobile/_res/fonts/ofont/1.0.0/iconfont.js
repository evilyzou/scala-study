;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-check" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M887.904 298.208c-12.864-12.064-33.152-11.488-45.216 1.408L415.936 753.984l-233.12-229.696C170.208 511.872 149.952 512 137.536 524.608c-12.416 12.576-12.256 32.864 0.352 45.248l256.48 252.672c0.096 0.096 0.224 0.128 0.32 0.224 0.096 0.096 0.128 0.224 0.224 0.32 2.016 1.92 4.448 3.008 6.784 4.288 1.152 0.672 2.144 1.664 3.36 2.144 3.776 1.472 7.776 2.24 11.744 2.24 4.192 0 8.384-0.832 12.288-2.496 1.312-0.544 2.336-1.664 3.552-2.368 2.4-1.408 4.896-2.592 6.944-4.672 0.096-0.096 0.128-0.256 0.224-0.352 0.064-0.096 0.192-0.128 0.288-0.224l449.184-478.208C901.44 330.592 900.768 310.336 887.904 298.208z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shop" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M925.28 362.72c-0.060-0.45-0.15-0.87-0.24-1.23-0.36-1.74-0.84-3.42-1.53-5.040l-70.32-175.050c-12.18-36.3-47.16-58.56-88.080-58.65h-493.59c-41.46 0-73.68 22.050-85.35 56.91l-75.6 178.62c-0.36 1.050-0.75 2.61-1.080 4.2-5.49 16.86-8.25 34.17-8.25 51.54 0.060 61.080 33.57 116.85 87.42 145.56 0 0 0 0.030 0.030 0.030s0.030 0 0.030 0.030v0c0 0 0.030 0 0.030 0.030 22.17 11.82 48.24 17.82 77.61 17.82 49.23-0.15 94.83-21.78 125.91-58.8 30.93 36.72 76.17 58.2 125.31 58.5 48.75-0.39 93.87-21.96 124.65-58.65 31.080 37.020 76.74 58.56 126.21 58.56 29.94-0.15 56.52-6.45 78.9-18.72 53.040-28.98 85.95-84.54 85.92-144.99 0.090-17.37-2.76-34.8-7.98-50.67zM818.63 505.73c-13.59 7.44-30.54 11.25-50.25 11.37-36.54 0-69.84-18.54-89.28-50.010-1.38-2.97-3.69-7.89-8.010-12.63-4.95-5.55-13.95-12.12-28.77-12.12-11.94 0-22.77 4.89-28.89 12.39-4.050 4.56-6.27 9.090-7.86 12.39-19.2 31.080-52.23 49.8-88.020 50.070-36.24-0.21-69.36-18.87-88.68-50.19-1.35-2.76-3.6-7.41-7.11-11.34-14.1-16.83-45.66-15.96-57.96-1.29-4.53 4.95-6.9 9.93-8.43 13.32-19.38 31.080-52.71 49.71-89.070 49.83-19.38 0-35.97-3.63-49.35-10.77 0 0-0.030 0-0.030 0 0 0 0 0-0.030 0-34.32-18.27-55.65-53.79-55.68-92.67 0-11.49 1.92-23.070 5.76-34.35 0.27-0.81 0.51-1.71 0.72-2.64l74.46-176.040c1.53-4.5 6.15-18.21 29.31-18.21h493.74c9.51 0.57 25.89 2.25 31.71 19.38l69.72 173.61c0.27 1.26 0.6 2.46 0.9 3.45 3.87 11.31 5.79 22.8 5.79 34.2 0.060 38.43-20.91 73.77-54.69 92.25zM841.13 602c-16.59 0-30 13.41-30 30l0.060 163.68c0 9.3-7.59 16.86-16.86 16.89l-564.45 0.36c-9.3 0-16.86-7.5-16.86-16.74l-0.21-160.86c-0.030-16.56-13.47-29.94-30-29.94 0 0-0.030 0-0.060 0-16.56 0.030-29.97 13.47-29.94 30.060l0.21 160.77c0 42.3 34.47 76.71 76.86 76.71l564.54-0.36c42.33-0.090 76.77-34.59 76.77-76.92l-0.060-163.65c0-16.59-13.44-30-30-30zM752 392h-480c-16.56 0-30-13.44-30-30s13.44-30 30-30h480c16.59 0 30 13.44 30 30s-13.41 30-30 30z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-time" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M511.050 75.073c-240.818 0-436.041 195.214-436.041 436.022 0 240.807 195.222 436.022 436.041 436.022 240.818 0 436.041-195.215 436.041-436.022 0-240.809-195.222-436.022-436.041-436.022zM779.991 780.022c-71.837 71.834-167.349 111.394-268.94 111.394s-197.104-39.561-268.939-111.394c-71.837-71.833-111.398-167.341-111.398-268.929s39.562-197.095 111.398-268.929 167.348-111.394 268.939-111.394c101.593 0 197.104 39.561 268.94 111.394s111.398 167.342 111.398 268.929-39.562 197.097-111.398 268.929zM801.969 491.229h-261.978v-261.967c0-16.076-13.033-29.108-29.109-29.108s-29.109 13.033-29.109 29.108v291.074c0 16.076 13.033 29.108 29.109 29.108h291.086c16.076 0 29.109-13.033 29.109-29.108s-13.033-29.108-29.109-29.108z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-order" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M682.566 477.058h-338.627c-10.386 0-18.814 8.833-18.814 19.723v9.822c0 10.9 8.428 19.733 18.814 19.733h338.627c10.386 0 18.814-8.843 18.814-19.733v-9.822c0.009-10.891-8.428-19.723-18.814-19.723zM505.152 654.789h-162.023c-9.941 0-18.003 8.873-18.003 19.812v9.97c0 10.93 8.062 19.803 18.003 19.803h162.023c9.941 0 18.003-8.863 18.003-19.803v-9.97c0-10.94-8.062-19.812-18.003-19.812zM849.901 62h-673.296c-21.881 0-39.606 18.358-39.606 41.011v817.138c0 22.642 17.725 41.011 39.606 41.011h479.273c7.3-1.523 20.218-5.975 33.819-19.17l179.838-180.352c0 0 15.607-15.045 19.981-40.081v-618.547c-0.009-22.651-17.745-41.011-39.616-41.011zM839.851 755.474c-0.030-0.503-0.099-0.999-0.148-1.493l0.148-0.148v1.642zM839.851 714.158h-153.773c-35.313 0-44.027 10.613-44.027 44.315v101.586l-0.021 0.021v51.802h-433.596c-12.028 0-21.772-10.089-21.772-22.505v-755.573c0-12.443 9.743-22.513 21.772-22.513h609.644c12.028 0 21.772 10.070 21.772 22.513v580.356zM682.566 289.139h-338.627c-10.386 0-18.814 8.863-18.814 19.803v9.97c0 10.93 8.428 19.803 18.814 19.803h338.627c10.386 0 18.814-8.863 18.814-19.803v-9.97c0.009-10.93-8.428-19.803-18.814-19.803z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-recharge" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 92c-231.6 0-420 188.4-420 420s188.4 420 420 420 420-188.4 420-420-188.4-420-420-420zM512 872c-198.51 0-360-161.49-360-360s161.49-360 360-360c198.51 0 360 161.49 360 360 0 198.51-161.49 360-360 360zM633.020 512c16.59 0 30-13.44 30-30s-13.41-30-30-30h-91.020v-14.19l111.18-116.13c11.43-12 11.25-30.99-0.75-42.42-11.94-11.4-30.78-10.98-42.27 1.050l-95.25 100.11-100.86-100.65c-11.76-11.73-30.72-11.67-42.42 0.060s-12.27 30.72-0.54 42.42l110.91 111.21v18.54h-88.86c-16.56 0-30 13.44-30 30s13.44 30 30 30h88.86v60h-88.86c-16.56 0-30 13.41-30 30s13.44 30 30 30h88.86v89.19c0 16.59 13.44 30 30 30s30-13.41 30-30v-89.19h91.020c16.59 0 30-13.41 30-30s-13.41-30-30-30h-91.020v-60h91.020z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-home-active" viewBox="0 0 1046 1024">' +
    '' +
    '<path d="M936.74 451.825l-341.348-354.973c-21.212-22.039-49.561-34.166-79.95-34.166-30.386 0-58.742 12.128-79.953 34.166l-341.346 354.973c-35.224 36.64-30.689 68.309-24.866 81.539 4.15 9.387 18.16 35.187 58.523 35.187h50.028v273.075c0 61.997 44.566 120.373 107.897 120.373h145.313v-288.992c0-30.985-4.699-48.249 26.982-48.249h114.842c31.678 0 26.979 17.263 26.979 48.249v288.993h145.314c63.33 0 107.897-58.376 107.897-120.373v-273.075h50.032c40.361 0 54.372-25.8 58.522-35.187 5.822-13.23 10.358-44.9-24.867-81.54v0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-search" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M892.816 823.002l-153.361-153.361c43.276-57.758 68.911-129.495 68.911-207.221 0-191.051-154.877-345.929-345.93-345.929-191.050 0-345.928 154.877-345.928 345.929 0 191.050 154.877 345.929 345.928 345.929 77.705 0 149.424-25.621 207.175-68.875l153.581 153.573c8.937 8.934 21.28 14.46 34.915 14.46 27.274 0 49.384-22.11 49.384-49.383-0.001-13.742-5.618-26.168-14.677-35.121zM215.429 462.421c0-136.418 110.589-247.007 247.007-247.007s247.008 110.589 247.008 247.007-110.59 247.006-247.009 247.006c-136.418 0-247.006-110.587-247.006-247.006z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-location" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M463.059 909.177c-48.941-52.706-295.529-318.117-295.529-489.412 0-190.118 154.353-344.47 344.47-344.47 190.118 0 344.47 154.353 344.47 344.47 0 171.294-246.588 436.706-295.529 489.412-48.941 54.588-48.941 54.588-97.883 0v0 0zM512 120.471c-163.764 0-299.294 133.647-299.294 299.294 0 156.235 184.471 353.883 293.647 472.471l3.765 3.765 3.765-3.765c111.059-118.588 293.647-316.236 293.647-472.471 3.765-165.647-129.882-299.294-295.529-299.294v0 0zM512 591.058c-94.117 0-169.412-75.294-169.412-169.412s75.294-169.412 169.412-169.412c94.117 0 169.412 75.294 169.412 169.412 0 94.117-75.294 169.412-169.412 169.412v0 0zM512 301.177c-67.764 0-122.353 54.588-122.353 122.353s54.588 122.353 122.353 122.353c67.764 0 122.353-54.588 122.353-122.353 0-67.764-54.588-122.353-122.353-122.353v0 0zM512 301.177z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-home" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M930.089655 451.955462 591.334371 99.656721c-21.042245-21.914102-49.176003-33.945113-79.284741-33.945113-30.225395 0-58.357106 12.032034-79.399351 33.945113L93.894995 451.955462c-34.932604 36.32737-30.457686 67.77357-24.645306 80.910774 4.126994 9.299807 18.019399 34.932604 58.06751 34.932604l49.63956 0 0 271.040043c0 61.497633 44.233434 119.448486 107.125833 119.448486l144.151098 0L428.23369 671.437246c0-30.747281-4.649903-47.836495 26.796296-47.836495l113.985054 0c31.388894 0 26.737968 17.089214 26.737968 47.836495l0 286.850124 144.209426 0c62.834071 0 107.126856-57.950853 107.126856-119.448486L847.089289 567.79884l49.638537 0c39.990806 0 53.940516-25.632797 58.009182-34.932604C960.547341 519.730055 965.082634 488.283856 930.089655 451.955462zM896.72578 512 791.169699 512l0 326.839907c0 30.748305-19.763113 63.646576-51.209312 63.646576l-88.350211 0L651.610176 671.437246c0-61.495586-19.704784-103.637382-82.597183-103.637382L455.028962 567.799864c-62.833047 0-82.59616 42.142819-82.59616 103.637382l0 231.049237-88.351234 0c-31.446199 0-51.266617-32.898271-51.266617-63.646576L232.814951 512 127.316176 512c-0.98749 0-1.917676-3.836375-2.731204-3.894703 1.976004-3.371794 5.28947-11.915377 10.81123-17.670451l338.814636-352.066451c10.05603-10.521634 24.354688-16.972557 38.246069-16.856923 13.8351-0.115634 27.2619 6.335289 37.375236 16.856923l338.755284 352.066451c5.581112 5.755074 8.893554 14.298658 10.81123 17.670451C898.586151 508.163625 897.654942 512 896.72578 512z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-calendar" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M708.257 787.773h34.628c20.037 0 36.274-12.005 36.274-26.795s-16.253-26.795-36.274-26.795h-34.628c-20.020 0-36.274 12.005-36.274 26.795s16.253 26.795 36.274 26.795z"  ></path>' +
    '' +
    '<path d="M708.257 627.007h34.628c20.037 0 36.274-12.005 36.274-26.795s-16.253-26.795-36.274-26.795h-34.628c-20.020 0-36.274 12.005-36.274 26.795s16.253 26.795 36.274 26.795z"  ></path>' +
    '' +
    '<path d="M493.907 627.007h34.618c20.027 0 36.279-12.005 36.279-26.795s-16.253-26.795-36.279-26.795h-34.618c-20.032 0-36.279 12.005-36.279 26.795s16.249 26.795 36.279 26.795z"  ></path>' +
    '' +
    '<path d="M279.553 627.007h34.618c20.032 0 36.279-12.005 36.279-26.795s-16.249-26.795-36.279-26.795h-34.618c-20.027 0-36.279 12.005-36.279 26.795s16.253 26.795 36.279 26.795z"  ></path>' +
    '' +
    '<path d="M493.907 787.773h34.618c20.027 0 36.279-12.005 36.279-26.795s-16.253-26.795-36.279-26.795h-34.618c-20.032 0-36.279 12.005-36.279 26.795s16.249 26.795 36.279 26.795z"  ></path>' +
    '' +
    '<path d="M279.553 787.773h34.618c20.032 0 36.279-12.005 36.279-26.795s-16.249-26.795-36.279-26.795h-34.618c-20.027 0-36.279 12.005-36.279 26.795s16.253 26.795 36.279 26.795z"  ></path>' +
    '' +
    '<path d="M782.113 198.298h-54.080v-76.235c0.061-0.732 0.099-1.47 0.099-2.217 0-14.514-11.769-26.282-26.282-26.282-14.388 0-26.068 11.562-26.273 25.902h-0.010v78.832h-325.979v-76.235c0.061-0.732 0.099-1.47 0.099-2.217 0-14.514-11.769-26.282-26.282-26.282-14.388 0-26.068 11.562-26.273 25.902h-0.010v78.832h-56.761c-87.055 0-157.856 61.034-157.856 176.269v414.443c0 82.864 62.832 151.163 142.873 158.815l556.732 0.711c87.007 0 157.813-71.578 157.813-159.549v-431.185c0-87.955-70.786-159.506-157.813-159.506zM886.338 804.733c0 49.735-43.181 90.217-96.25 90.217h-557.692c-53.095 0-96.298-40.48-96.298-90.217v-338.493h750.241v338.493zM886.338 342.081v70.57h-750.241v-70.55c0-44.197 38.851-90.217 107.178-90.217h53.851v80.436h0.025c0.496 14.079 12.059 25.343 26.258 25.343 14.514 0 26.282-11.769 26.282-26.282 0-0.747-0.038-1.486-0.099-2.217v-77.279h325.98v80.436h0.025c0.496 14.079 12.057 25.343 26.258 25.343 14.514 0 26.282-11.769 26.282-26.282 0-0.747-0.038-1.486-0.099-2.217v-77.279h51.127c53.067 0 111.833 39.152 107.177 90.195z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-map" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M908.8 290.133l-78.933-23.467c-14.933-83.2-83.2-138.667-168.533-138.667-83.2 0-151.467 53.333-168.533 132.267l-119.467 34.133c-4.267 2.133-8.533 2.133-10.667 2.133-4.267 0-8.533 0-12.8-2.133l-209.067-59.733c-4.267-2.133-8.533-2.133-12.8-2.133-23.467 0-42.667 19.2-42.667 42.667v503.467c0 19.2 12.8 36.267 29.867 40.533l234.667 72.533c4.267 2.133 8.533 2.133 12.8 2.133s8.533 0 10.667-2.133l275.2-78.933c4.267-2.133 8.533-2.133 10.667-2.133 4.267 0 8.533 0 12.8 2.133l209.067 64c4.267 2.133 8.533 2.133 12.8 2.133 23.467 0 42.667-19.2 42.667-42.667v-505.6c2.133-19.2-10.667-36.267-27.733-40.533zM362.667 341.333v509.867l-234.667-72.533v-503.467l211.2 61.867c8.533 2.133 14.933 2.133 23.467 4.267 0-2.133 0-2.133 0 0 0-2.133 0 0 0 0zM661.333 170.667c72.533 0 128 53.333 128 123.733 0 27.733-10.667 57.6-32 87.467-27.733 38.4-66.133 96-96 140.8-29.867-42.667-68.267-102.4-96-140.8-21.333-29.867-32-59.733-32-87.467 0-70.4 55.467-123.733 128-123.733zM896 838.4l-209.067-64c-2.133 0-2.133 0-4.267 0 0-2.133 0-2.133 0-4.267v-128c0-12.8-8.533-21.333-21.333-21.333s-21.333 8.533-21.333 21.333v128c0 2.133 0 2.133 0 4.267-2.133 0-2.133 0-4.267 0l-230.4 64v-497.067c0-4.267-2.133-6.4-2.133-10.667l89.6-25.6c2.133 38.4 19.2 70.4 38.4 100.267 25.6 36.267 66.133 96 96 138.667 8.533 12.8 21.333 19.2 36.267 19.2s27.733-6.4 36.267-19.2c27.733-42.667 68.267-102.4 96-138.667 19.2-27.733 36.267-59.733 38.4-96l64 19.2v509.867zM661.333 362.667c36.267 0 64-27.733 64-64s-27.733-64-64-64-64 27.733-64 64 27.733 64 64 64zM661.333 277.333c12.8 0 21.333 8.533 21.333 21.333s-8.533 21.333-21.333 21.333-21.333-8.533-21.333-21.333 8.533-21.333 21.333-21.333z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-plane" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M916.887 93.317c-2.842-1.505-5.959-2.233-9.321-2.233-12.229 0-23.35 10.161-23.177 10.161-7.446 4.157-744.789 416.428-770.875 431.668-14.723 8.578-23.143 23.242-21.93 38.251 0.934 12.354 8.279 22.087 19.538 26.089 22.135 7.776 245.483 86.048 245.483 86.048l4.089 1.386 14.099-47.027-215.1-74.732 660.331-381.717c-70.050 88.205-355.681 447.522-368.843 464.069-17.010 21.127-24.944 42.37-24.873 66.695l0.239 144.002h-0.066c0 0 0.066 50.258 0.066 50.414v1.849c1.010 12.699 10.777 22.782 22.45 22.782 11.676 0 21.582-10.084 22.623-22.782 0 0 0.45-179.489 0-192.687-0.416-11.738 4.295-24.938 9.040-31.057 4.782-6.003 330.396-415.851 393.927-495.894-18.084 99.977-107.151 591.682-108.465 598.875-0.695 3.812-2.183 3.812-2.842 3.812-0.521 0-1.111-0.113-1.733-0.347-6.308-2.228-227.362-76.615-236.753-79.773l-3.981-1.349-14.517 47.45 4.297 1.5c2.183 0.734 218.98 74.314 240.525 81.242 4.297 1.386 8.66 2.114 13.062 2.114 22.831 0 41.917-18.203 46.419-44.141 1.767-10.272 22.867-126.531 47.291-261.185 33.637-185.223 71.709-395.187 72.681-401.766l0.519-3.12c1.801-10.812 4.815-28.666-14.202-38.594z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-tuijian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M924.438 355.343l-402.596 230.401c-2.671 1.491-5.596 2.249-8.548 2.249-2.924 0-5.848-0.758-8.492-2.249l-405.52-232.003c-5.512-3.149-8.914-9.111-8.914-15.521 0-6.44 3.402-12.372 8.914-15.521l402.652-230.345c5.287-2.98 11.752-2.98 17.012 0l405.493 231.947c5.512 3.149 8.914 9.082 8.914 15.521 0 6.412-3.402 12.344-8.914 15.521zM510.453 153.848l-331.936 178.888 334.776 191.541 342.058-184.456-344.898-185.974zM116.292 482.718l397.001 227.138 394.104-225.536c8.407-4.779 19.064-1.744 23.703 6.833 4.724 8.576 1.716 44.962-6.665 49.798l-402.596 230.373c-2.671 1.491-5.596 2.277-8.548 2.277-2.924 0-5.848-0.787-8.492-2.277l-405.52-231.975c-8.378-4.837-11.388-41.221-6.665-49.798 4.64-8.576 15.268-11.613 23.675-6.832zM116.292 642.767l397.001 227.138 394.104-225.536c8.407-4.752 19.064-1.744 23.703 6.833 4.724 8.548 1.716 44.962-6.665 49.769l-402.596 230.401c-2.671 1.491-5.596 2.249-8.548 2.249-2.924 0-5.848-0.758-8.492-2.249l-405.52-232.003c-8.378-4.808-11.388-41.221-6.665-49.769 4.64-8.575 15.268-11.669 23.675-6.833z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-contact" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 90.125c-233.002 0-421.875 188.873-421.875 421.875s188.873 421.875 421.875 421.875c233.002 0 421.875-188.873 421.875-421.875 0-233.002-188.873-421.875-421.875-421.875zM512 895.531c-211.793 0-383.531-171.725-383.531-383.531 0-211.823 171.737-383.514 383.531-383.514 211.837 0 383.531 171.691 383.531 383.514 0 211.807-171.696 383.531-383.531 383.531zM744.129 649.102c0-8.741-3.506-16.664-9.274-22.402-1.695-1.68-3.574-3.114-5.632-4.38l-89.4-69.52c-5.721-5.754-13.673-9.293-22.385-9.293-7.155 0-13.718 2.489-19.001 6.502l-24.946 25.148-0.080-0.064c-3.844 4.316-9.399 7.079-15.656 7.079-7.138 0-13.395-3.556-17.259-8.969-0.101 0.199-0.304 0.38-0.456 0.612-34.484-25.042-65.091-55.193-90.070-89.724 0.228-0.169 0.456-0.35 0.67-0.506-5.463-3.86-9.096-10.223-9.096-17.458 0-6.467 2.961-12.174 7.492-16.081v-0.030l24.828-24.642c4.013-5.248 6.455-11.808 6.455-18.951 0-8.741-3.569-16.664-9.261-22.415l-69.55-89.4c-1.266-2.017-2.7-3.936-4.38-5.616-5.738-5.738-13.639-9.293-22.402-9.293-42.251 0-95.015 49.638-95.015 110.869 0 16.968 3.936 32.974 10.712 47.363l-0.338 0.35c63.522 126.513 169.1 232.099 295.655 295.642l0.333-0.354c14.391 6.822 30.382 10.728 47.377 10.728 61.206 0 110.873-52.797 110.873-95.032 0-0.059-0.050-0.101-0.050-0.165h-0.147z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-manage" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M416.331 106.423h-295.018c-16.294 0-29.502 13.208-29.502 29.502v312.266c0 16.294 13.208 29.502 29.502 29.502h295.018c16.294 0 29.502-13.208 29.502-29.502v-312.266c0-16.294-13.208-29.502-29.502-29.502zM386.83 418.688h-236.015v-253.262h236.015v253.262z"  ></path>' +
    '' +
    '<path d="M416.331 578.45h-295.018c-16.294 0-29.502 13.208-29.502 29.502v295.017c0 16.294 13.208 29.502 29.502 29.502h295.018c16.294 0 29.502-13.208 29.502-29.502v-295.017c0-16.294-13.208-29.502-29.502-29.502zM386.83 873.468h-236.015v-236.015h236.015v236.015z"  ></path>' +
    '' +
    '<path d="M888.359 578.45h-295.018c-16.294 0-29.502 13.208-29.502 29.502v295.017c0 16.294 13.208 29.502 29.502 29.502h295.018c16.294 0 29.502-13.208 29.502-29.502v-295.017c0-16.294-13.208-29.502-29.502-29.502zM858.857 873.468h-236.014v-236.015h236.015v236.015z"  ></path>' +
    '' +
    '<path d="M968.223 264.669l-208.608-208.609c-11.522-11.522-30.201-11.522-41.722 0l-208.609 208.609c-11.522 11.522-11.522 30.201 0 41.722l208.609 208.609c11.522 11.521 30.201 11.522 41.722 0l208.609-208.609c11.521-11.522 11.521-30.201-0.001-41.722zM738.753 452.416l-166.886-166.886 166.886-166.887 166.887 166.887-166.887 166.886z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-user-active" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M954.211029 511.591701c0-59.82862-11.720949-117.876688-34.837436-172.532495-22.323425-52.782134-54.280254-100.181677-94.979188-140.881634-40.699957-40.699957-88.099501-72.656787-140.881634-94.982258-54.655807-23.116487-112.705921-34.83846-172.535565-34.83846-59.826574 0-117.873618 11.721973-172.528402 34.83846-52.782134 22.324448-100.181677 54.281277-140.882658 94.981235-40.700981 40.700981-72.65781 88.100524-94.983281 140.881634C79.463308 393.71399 67.741335 451.762057 67.741335 511.591701c0 59.832713 11.721973 117.881804 34.839483 172.537611 21.035082 49.730635 50.627051 94.677313 88.020706 133.748167l-0.348947 0.916882 8.740058 7.607258c13.83817 13.715373 28.448936 26.417673 43.769876 38.09155l0.431835 0.375553 0.276293 0.166799c24.905226 18.896372 51.696406 35.049261 80.150458 48.321542l1.028423 0.620124 0.964978 0.309038c4.245697 1.954515 8.514931 3.869121 12.833283 5.695722 29.065989 12.292977 59.092863 21.36254 89.835028 27.160593l0.98749 0.316202 0.74599 0c26.50977 4.889357 53.547567 7.357572 80.959893 7.357572 46.091758 0 91.179652-7.030114 134.003993-20.561291l1.868557-0.25378 1.146103-0.704035c63.862493-20.686135 122.594129-55.892985 171.96456-103.905488l11.168364-10.861372-0.169869-0.209778c36.820604-38.363749 66.109674-82.462107 87.173408-131.289162C942.071547 631.53956 954.211029 572.513212 954.211029 511.591701zM812.512796 788.166807c-10.289344-22.608927-23.100114-44.047192-38.219463-63.936171l-0.01228-0.017396c-30.588669-40.225143-70.511937-73.534783-115.455545-96.329952-20.415982-10.353812-41.534975-18.494213-63.240323-24.400736 51.481512-29.466102 86.24834-84.940554 86.24834-148.386562 0-94.206592-76.646658-170.849156-170.858366-170.849156-94.202499 0-170.84097 76.642564-170.84097 170.849156 0 62.588477 33.835619 117.414153 84.167958 147.171897-38.795585 9.91379-75.594699 26.794249-108.918665 50.186006-47.811936 33.56342-85.564771 78.326926-110.343107 130.510426C140.86168 710.697411 101.836875 615.615892 101.836875 511.591701c0-225.600131 183.539176-409.139308 409.139308-409.139308s409.139308 183.539176 409.139308 409.139308C920.11549 615.205547 882.078175 712.536292 812.512796 788.166807z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow-top" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M484.928 285.962l-399.175 398.836c-14.215 14.215-14.211 37.263 0.007 51.483 14.222 14.222 37.268 14.222 51.483 0.007l374.359-373.181 373.382 373.917c14.221 14.221 37.271 14.218 51.489-0.001 14.222-14.222 14.219-37.271 0.001-51.489l-398.183-399.572c-7.324-7.019-15.684-10.619-26.689-10.619-10.855 0-19.471 3.6-26.674 10.619z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-next" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M736.67 485.326l-398.836-399.175c-14.215-14.215-37.263-14.211-51.483 0.007-14.222 14.222-14.222 37.268-0.007 51.483l373.181 374.359-373.917 373.382c-14.221 14.221-14.218 37.271 0.001 51.489 14.222 14.222 37.271 14.219 51.489 0.001l399.572-398.183c7.019-7.324 10.619-15.684 10.619-26.689 0-10.855-3.6-19.471-10.619-26.674z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-arrow-bottom" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M537.305 737.070l399.175-398.836c14.215-14.215 14.211-37.263-0.007-51.483-14.222-14.222-37.268-14.222-51.483-0.007l-374.359 373.181-373.382-373.917c-14.221-14.221-37.271-14.218-51.489 0.001-14.222 14.222-14.219 37.271-0.001 51.489l398.183 399.572c7.324 7.019 15.684 10.619 26.689 10.619 10.855 0 19.471-3.6 26.674-10.619z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-back" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M285.562 537.703l398.836 399.175c14.215 14.215 37.263 14.211 51.483-0.007 14.222-14.222 14.222-37.268 0.007-51.483l-373.181-374.359 373.917-373.382c14.221-14.221 14.218-37.271-0.001-51.489-14.222-14.222-37.271-14.219-51.489-0.001l-399.572 398.183c-7.019 7.324-10.619 15.684-10.619 26.689 0 10.855 3.6 19.471 10.619 26.674z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 72.032c-242.592 0-439.968 197.376-439.968 439.968s197.376 439.968 439.968 439.968c242.592 0 439.968-197.376 439.968-439.968s-197.376-439.968-439.968-439.968zM512 910.112c-113.568 0-215.904-48-288.48-124.512 48.864-110.4 160.224-189.792 288.48-189.792 128.352 0 239.52 79.488 288.288 189.984-72.576 76.32-174.816 124.32-288.288 124.32zM386.336 428.192c0-69.312 56.352-125.76 125.664-125.76s125.76 56.352 125.76 125.76c0 69.312-56.352 125.76-125.76 125.76-69.312 0-125.664-56.448-125.664-125.76zM605.984 566.912c44.448-30.144 73.632-81.12 73.632-138.72 0-92.448-75.168-167.616-167.616-167.616s-167.616 75.168-167.616 167.616c0 57.6 29.28 108.48 73.632 138.72-97.248 26.688-179.136 95.040-224.256 183.168-49.824-66.528-79.776-148.8-79.776-238.080 0-219.552 178.56-398.112 398.112-398.112s398.112 178.56 398.112 398.112c0 89.376-29.952 171.648-79.872 238.080-45.312-87.744-127.392-156.576-224.352-183.168z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-wifi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M522.7 429.2c-143.5 0-223.7 82.4-230.4 89.6-30.8 31.2-30.6 81.5 0.4 112.5 15.1 15.1 35 23.4 56.3 23.4s41.4-8.3 56.3-23.4l0.2-0.2c0.5-0.5 46.5-46.8 117.2-46.8 70.1 0 116.9 46.5 117.2 46.8l0.2 0.2c15.1 15.1 35 23.4 56.3 23.4s41.4-8.3 56.3-23.4c31-31 31.2-81.3 0.4-112.5C746.4 511.6 666.2 429.2 522.7 429.2zM723 601.4c-7 7-16.5 10.9-26.4 10.9-10 0-19.4-3.9-26.4-10.9-3.9-3.9-60.2-59.5-147.3-59.5s-143.5 55.5-147.3 59.5c-7 7-16.4 10.9-26.4 10.9s-19.4-3.9-26.4-10.9c-14.6-14.6-14.6-38.4 0-53 0.2-0.2 0.4-0.5 0.7-0.7 0.4-0.7 70.9-76.2 199.3-76.2 127.5 0 198.9 75.5 199.6 76.2 0.2 0.2 0.4 0.5 0.7 0.7C737.6 563 737.6 586.8 723 601.4zM922 328l-0.2-0.2c-1.6-1.6-41-39.3-109.7-77.1-63.4-34.9-165.1-76.4-289.4-76.4s-226 41.5-289.4 76.4c-68.8 37.8-108.1 75.5-109.7 77.1l-0.2 0.2c-30.8 30.8-30.8 81 0 112 15 15 34.9 23.2 56 23.2 20.9 0 40.8-8.1 55.6-22.9 2.1-2.1 31.3-28.7 79.9-55.1 45.8-25 119.2-54.6 207.7-54.6s162 29.6 207.9 54.4c48.6 26.4 77.8 53 79.9 54.9 15 14.8 34.7 22.9 55.6 22.9 21.1 0 41-8.3 56-23.2C952.9 409 952.9 358.8 922 328zM892.2 410c-7 7-16.2 10.7-26.1 10.7s-19.2-3.9-26.1-10.7c-0.2-0.2-0.2-0.2-0.4-0.4-1.4-1.2-32.9-31.2-87.7-60.9-50.5-27.6-131.3-60.4-229.4-60.4s-178.9 32.7-229.2 60.2c-54.7 29.9-86.4 59.7-87.7 60.9-0.2 0.2-0.2 0.2-0.4 0.4-7 7-16.2 10.7-26.1 10.7s-19.2-3.9-26.1-10.7c-14.3-14.3-14.4-37.7-0.2-51.9 2.3-2.3 39.4-36.8 101.9-70.9 58.8-32.2 153-70.4 267.8-70.4s209 38.4 267.8 70.4c62.5 34.2 99.6 68.8 101.8 70.9C906.5 372.4 906.5 395.6 892.2 410zM522.7 682.7c-46.7 0-84.5 37.8-84.5 84.5 0 46.7 37.8 84.5 84.5 84.5s84.5-37.8 84.5-84.5C607.2 720.6 569.3 682.7 522.7 682.7zM522.7 809.5c-23.2 0-42.2-19-42.2-42.2s19-42.2 42.2-42.2c23.2 0 42.2 19 42.2 42.2S545.9 809.5 522.7 809.5z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-manage-active" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M919.117255 245.699911 757.414409 83.997066c-22.323425-22.323425-58.512648-22.323425-80.836073 0l-161.702845 161.702845c-22.323425 22.323425-22.323425 58.512648 0 80.836073l161.702845 161.702845c22.323425 22.323425 58.511625 22.323425 80.836073 0l161.702845-161.702845C941.440679 304.211537 941.440679 268.023336 919.117255 245.699911L919.117255 245.699911zM716.996884 447.819259 555.295062 286.117436l161.701822-161.701822 161.701822 161.701822L716.996884 447.819259 716.996884 447.819259zM373.983623 114.611318 145.308457 114.611318c-31.585369 0-57.169047 25.582655-57.169047 57.169047l0 228.675166c0 31.585369 25.582655 57.169047 57.169047 57.169047l228.675166 0c31.585369 0 57.169047-25.582655 57.169047-57.169047L431.15267 171.779342C431.15267 140.193972 405.568992 114.611318 373.983623 114.611318L373.983623 114.611318zM373.983623 571.96165 145.308457 571.96165c-31.585369 0-57.169047 25.582655-57.169047 57.169047l0 228.675166c0 31.585369 25.582655 57.169047 57.169047 57.169047l228.675166 0c31.585369 0 57.169047-25.582655 57.169047-57.169047L431.15267 629.130697C431.15267 597.544305 405.568992 571.96165 373.983623 571.96165L373.983623 571.96165zM831.333956 571.96165 602.658789 571.96165c-31.585369 0-57.169047 25.582655-57.169047 57.169047l0 228.675166c0 31.585369 25.582655 57.169047 57.169047 57.169047l228.675166 0c31.585369 0 57.169047-25.582655 57.169047-57.169047L888.503003 629.130697C888.503003 597.544305 862.920348 571.96165 831.333956 571.96165L831.333956 571.96165z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-plane-active" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M64.521502 586.495668 960.385147 125.413338 723.734332 896.405997 460.048791 776.027325 348.269985 896.405997 348.269985 733.035162 848.605318 228.594325 250.820536 681.44518Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-guide" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 895.76336c211.070206 0 383.76336-172.693154 383.76336-383.76336s-172.693154-383.76336-383.76336-383.76336-383.764384 172.693154-383.764384 383.76336 172.694177 383.76336 383.764384 383.76336z m0 63.960731c-246.248404 0-447.724091-201.475687-447.724091-447.724091S265.751596 64.275909 512 64.275909s447.724091 201.475687 447.724091 447.724091-201.475687 447.724091-447.724091 447.724091zM256.157078 767.841899s105.637945-290.505373 161.758104-349.926717S767.841899 256.157078 767.841899 256.157078 662.203954 546.662451 606.083795 606.083795 256.157078 767.841899 256.157078 767.841899z m303.710116-211.275891l-92.433202-92.433202c-23.108301-23.108301-115.541503 211.275891-115.541503 211.275891s231.083006-95.734388 207.974705-118.842689z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-guide-active" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M559.573505 556.311205l-92.433202-92.433202c-23.108301-23.108301-115.541503 211.275891-115.541503 211.275891s231.083006-95.734388 207.974705-118.842689z" fill="" ></path>' +
    '' +
    '<path d="M511.706311 64.021106c-246.248404 0-447.724091 201.475687-447.724091 447.724091s201.475687 447.724091 447.724091 447.724091 447.724091-201.475687 447.724091-447.724091S757.954715 64.021106 511.706311 64.021106z m94.083795 541.807886c-56.120159 59.421344-349.926718 161.758104-349.926717 161.758104s105.637945-290.505373 161.758104-349.926718c56.120159-59.421344 349.926718-161.758104 349.926717-161.758104S661.910265 546.407648 605.790106 605.828992z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-breakfast" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M372.781 307.812c12.656 0 20.672-8.438 20.672-20.672v-167.062c0-12.656-8.437-20.672-20.672-20.672s-21.094 8.016-21.094 20.672v166.641c0 12.656 8.438 21.094 21.094 21.094zM289.25 307.812c12.656 0 20.672-8.438 20.672-20.672v-167.062c0-12.656-8.438-20.672-20.672-20.672-12.656 0-20.672 8.438-20.672 20.672v166.641c0 12.656 8.016 21.094 20.672 21.094zM455.891 99.406c-12.656 0-20.672 8.438-20.672 20.672v298.266c0 10.547-4.219 20.672-12.656 29.109l-37.547 37.547-12.234 14.344v350.156c0 22.781-18.563 41.766-41.766 41.766s-41.766-18.563-41.766-41.766v-350.578l-50.203-50.203c-8.438-8.438-12.656-18.563-12.656-29.109v-299.531c0-12.656-8.438-20.672-20.672-20.672s-20.672 8.438-20.672 20.672v298.266c0 22.781 8.438 43.875 24.891 58.219l37.547 39.656v333.281c0 45.984 37.547 83.531 83.531 83.531s83.531-37.547 83.531-83.531v-333.703l37.547-37.547c16.875-16.875 24.891-37.547 24.891-58.219v-299.953c0-12.656-8.438-20.672-21.094-20.672zM789.594 99.406c-114.75 0-208.406 93.656-208.406 208.406v333.703l83.531 83.531v124.453c0 45.984 37.547 83.531 83.531 83.531s83.531-37.547 83.531-83.531v-708.75c-0.422-22.781-19.406-41.344-42.188-41.344zM789.594 849.5c0 22.781-18.563 41.766-41.766 41.766s-41.766-18.563-41.766-41.766v-141.75l-83.531-83.531v-316.406c0-91.547 75.094-166.641 166.641-166.641v708.328z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)